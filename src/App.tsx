import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import type { SectionTab } from './components/Sidebar';
import { Header } from './components/Header';
import { ScoreBanner } from './components/ScoreBanner';
import { PersonalDetailsForm } from './components/Editor/PersonalDetailsForm';
import { ExperienceForm } from './components/Editor/ExperienceForm';
import { EducationForm } from './components/Editor/EducationForm';
import { SkillsForm } from './components/Editor/SkillsForm';
import { ProjectsForm } from './components/Editor/ProjectsForm';
import { CustomizerForm } from './components/Editor/CustomizerForm';
import { TemplateCarousel } from './components/TemplateCarousel';
import { PreviewToolbar } from './components/Preview/PreviewToolbar';
import { ResumePreview } from './components/Preview/ResumePreview';
import { AuthModal } from './components/Auth/AuthModal';
import { HistoryModal } from './components/History/HistoryModal';
import type { SavedResumeRecord } from './components/History/HistoryModal';
import { initialResumeData, defaultCustomization } from './data/sampleResume';
import type { ResumeData, Customization, TemplateId } from './types/resume';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Sun } from 'lucide-react';

export const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [customization, setCustomization] = useState<Customization>(defaultCustomization);
  const [resumeTitle, setResumeTitle] = useState<string>("Software Engineer Resume");
  const [activeTab, setActiveTab] = useState<SectionTab>('personal');
  const [user, setUser] = useState<User | null>(null);
  
  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | undefined>(undefined);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyList, setHistoryList] = useState<SavedResumeRecord[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [_isSaving, setIsSaving] = useState(false);
  const [pendingDownload, setPendingDownload] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  // Listen for Supabase Auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchHistory(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchHistory(currentUser.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch saved resume history from Supabase
  const fetchHistory = async (userId: string) => {
    setIsHistoryLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) {
        console.warn("Error fetching history:", error.message);
        return;
      }

      if (data) {
        setHistoryList(data);
      }
    } catch (err) {
      console.warn("Could not fetch history:", err);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  // Upload PDF Blob to Supabase Storage Bucket
  const uploadPdfToStorage = async (currentUser: User, pdfBlob: Blob): Promise<string | undefined> => {
    try {
      const sanitizedName = (resumeData.personalDetails.fullName || 'resume').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filePath = `${currentUser.id}/${Date.now()}_${sanitizedName}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from('resumes-pdf')
        .upload(filePath, pdfBlob, {
          contentType: 'application/pdf',
          upsert: true
        });

      if (uploadError) {
        console.warn("Supabase Storage upload warning:", uploadError.message);
        return undefined;
      }

      const { data: publicUrlData } = supabase.storage
        .from('resumes-pdf')
        .getPublicUrl(filePath);

      return publicUrlData?.publicUrl;
    } catch (err) {
      console.warn("Failed to upload PDF to bucket:", err);
      return undefined;
    }
  };

  // Save current resume data & snapshot to Supabase
  const saveUserResume = async (currentUser = user, pdfUrl?: string): Promise<boolean> => {
    if (!currentUser) return false;
    setIsSaving(true);

    try {
      const title = resumeTitle || `${resumeData.personalDetails.fullName || 'My'} Resume`;
      
      const { error } = await supabase
        .from('resumes')
        .insert({
          user_id: currentUser.id,
          title,
          content: resumeData,
          customization,
          pdf_url: pdfUrl || null
        });

      if (error) throw error;

      fetchHistory(currentUser.id);
      return true;
    } catch (err: any) {
      console.error("Error saving resume to Supabase:", err.message);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Delete resume entry from history
  const handleDeleteHistory = async (id: string) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this saved resume snapshot?")) return;

    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setHistoryList((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      alert("Error deleting record: " + err.message);
    }
  };

  // Load selected resume from history into editor
  const handleLoadFromHistory = (record: SavedResumeRecord) => {
    if (record.content) setResumeData(record.content);
    if (record.customization) setCustomization(record.customization);
    if (record.title) setResumeTitle(record.title);
    setIsHistoryOpen(false);
  };

  // Trigger PDF Download (Gated behind Auth)
  const handleDownloadPDF = async () => {
    if (!user) {
      setAuthMessage("Please sign in or create an account to download your resume & save to Supabase cloud.");
      setPendingDownload(true);
      setIsAuthOpen(true);
      return;
    }

    executePDFDownloadAndCloudSave(user);
  };

  // Generate PDF, Upload to Supabase Storage Bucket, and Trigger Download
  const executePDFDownloadAndCloudSave = async (currentUser: User) => {
    const element = previewRef.current;
    if (!element) return;
    setIsSaving(true);

    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const filename = `${resumeData.personalDetails.fullName || 'Resume'}_CV.pdf`;
      const opt = {
        margin: 0,
        filename,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };

      // 1. Generate PDF Blob
      const pdfBlob: Blob = await html2pdf().set(opt).from(element).outputPdf('blob');

      // 2. Upload PDF Blob to Supabase Storage Bucket
      const pdfUrl = await uploadPdfToStorage(currentUser, pdfBlob);

      // 3. Save snapshot record in database with pdf_url link
      await saveUserResume(currentUser, pdfUrl);

      // 4. Save file to client download
      html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.warn("html2pdf processing error, falling back to basic download:", err);
      saveUserResume(currentUser);
      window.print();
    } finally {
      setIsSaving(false);
    }
  };

  const handleAuthSuccess = () => {
    if (pendingDownload && user) {
      setPendingDownload(false);
      setTimeout(() => {
        executePDFDownloadAndCloudSave(user);
      }, 500);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setHistoryList([]);
  };

  // Tab navigation helpers
  const tabSequence: SectionTab[] = ['personal', 'experience', 'education', 'skills', 'projects', 'certifications', 'summary', 'customizer'];
  
  const handleNextTab = () => {
    const currentIndex = tabSequence.indexOf(activeTab);
    if (currentIndex < tabSequence.length - 1) {
      setActiveTab(tabSequence[currentIndex + 1]);
    }
  };

  return (
    <div className="app-container-pro">
      {/* 1. Left Vertical Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        userName={resumeData.personalDetails.fullName}
      />

      {/* Main Center & Right Workspace */}
      <div className="app-workspace">
        {/* 2. Top Header Bar */}
        <Header
          resumeTitle={resumeTitle}
          onTitleChange={setResumeTitle}
          user={user}
          onOpenAuth={() => {
            setAuthMessage("Sign in or Sign up to access your Supabase saved resumes & history.");
            setIsAuthOpen(true);
          }}
          onSignOut={handleSignOut}
          onOpenHistory={() => {
            if (user) fetchHistory(user.id);
            setIsHistoryOpen(true);
          }}
          historyCount={historyList.length}
        />

        {/* 2 Panel Middle Workspace */}
        <div className="workspace-panels">
          {/* Center Form Editor Panel */}
          <main className="editor-main-panel">
            {/* Score Progress Banner */}
            <ScoreBanner />

            {/* Form Section Card */}
            {activeTab === 'personal' && (
              <PersonalDetailsForm
                data={resumeData.personalDetails}
                onChange={(details) => setResumeData({ ...resumeData, personalDetails: details })}
                onNext={handleNextTab}
              />
            )}

            {activeTab === 'experience' && (
              <div className="card-form-section">
                <div className="card-form-header">
                  <h3>Work Experience</h3>
                  <p>Add your past work experience and achievements.</p>
                </div>
                <ExperienceForm
                  experiences={resumeData.experiences}
                  onChange={(exps) => setResumeData({ ...resumeData, experiences: exps })}
                />
              </div>
            )}

            {activeTab === 'education' && (
              <div className="card-form-section">
                <div className="card-form-header">
                  <h3>Education</h3>
                  <p>Add your degrees and academic qualifications.</p>
                </div>
                <EducationForm
                  educations={resumeData.educations}
                  onChange={(edus) => setResumeData({ ...resumeData, educations: edus })}
                />
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="card-form-section">
                <div className="card-form-header">
                  <h3>Skills & Technologies</h3>
                  <p>Add your technical skills and proficiency levels.</p>
                </div>
                <SkillsForm
                  skills={resumeData.skills}
                  onChange={(sks) => setResumeData({ ...resumeData, skills: sks })}
                />
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="card-form-section">
                <div className="card-form-header">
                  <h3>Projects</h3>
                  <p>Highlight your key projects and open-source contributions.</p>
                </div>
                <ProjectsForm
                  projects={resumeData.projects}
                  onChange={(projs) => setResumeData({ ...resumeData, projects: projs })}
                />
              </div>
            )}

            {activeTab === 'customizer' && (
              <div className="card-form-section">
                <div className="card-form-header">
                  <h3>Colors & Fonts Customizer</h3>
                  <p>Customize the template accent color, font family, and font size.</p>
                </div>
                <CustomizerForm
                  customization={customization}
                  onChange={setCustomization}
                />
              </div>
            )}

            {/* Choose a Template Carousel Grid */}
            <TemplateCarousel
              activeTemplate={customization.templateId}
              onSelectTemplate={(templateId: TemplateId) =>
                setCustomization({ ...customization, templateId })
              }
            />
          </main>

          {/* Right Live Document Preview Panel */}
          <aside className="preview-main-panel">
            {/* Live Preview Header */}
            <div className="preview-top-header no-print">
              <div className="live-indicator">
                <span className="live-dot"></span>
                <span>Live Preview</span>
              </div>
              <Sun size={18} color="#64748b" style={{ cursor: 'pointer' }} />
            </div>

            {/* Document Sheet View */}
            <div className="preview-sheet-container">
              <ResumePreview
                ref={previewRef}
                data={resumeData}
                customization={customization}
              />
            </div>

            {/* Bottom Action Bar */}
            <PreviewToolbar
              onDownload={handleDownloadPDF}
              onOpenCustomizer={() => setActiveTab('customizer')}
            />
          </aside>
        </div>
      </div>

      {/* Supabase Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingDownload(false);
        }}
        onSuccess={handleAuthSuccess}
        customMessage={authMessage}
      />

      {/* Supabase Resume History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        historyList={historyList}
        onLoadResume={handleLoadFromHistory}
        onDeleteResume={handleDeleteHistory}
        isLoading={isHistoryLoading}
      />
    </div>
  );
};

export default App;
