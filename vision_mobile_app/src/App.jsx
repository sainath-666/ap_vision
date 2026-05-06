import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  User, 
  Activity, 
  Clipboard, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Menu, 
  Bell, 
  Plus, 
  Search,
  History,
  FileText,
  Stethoscope,
  PenTool,
  Droplets,
  Zap
} from 'lucide-react';

// --- Step Components ---

const Dashboard = ({ onNewScreening }) => (
  <div className="fade-in">
    <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '24px', background: 'linear-gradient(135deg, #0066FF, #00D1FF)', color: 'white' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Vision Outreach</h2>
      <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Illuminating Lives Across All 26 Districts of Andhra Pradesh.</p>
      <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>1,284</div>
          <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>SCREENINGS TODAY</div>
        </div>
        <div style={{ width: '1px', background: 'rgba(255,255,255,0.3)' }}></div>
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>942</div>
          <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>SPECTACLES PENDING</div>
        </div>
      </div>
    </div>

    <div className="btn btn-primary btn-block" style={{ height: '60px', borderRadius: '16px', marginBottom: '24px' }} onClick={onNewScreening}>
      <Plus size={24} /> New Eye Examination
    </div>

    <h3 style={{ marginBottom: '16px', fontWeight: 700 }}>Recent Activity</h3>
    {[1, 2, 3].map(i => (
      <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
        <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '12px', color: 'var(--primary)' }}>
          <User size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600 }}>Ramesh Babu</div>
          <div style={{ fontSize: '0.8rem', color: var(--text-muted) }}>ID: AP-26-4829 • 2 hrs ago</div>
        </div>
        <div style={{ color: 'var(--accent)', fontWeight: 600 }}>Synced</div>
      </div>
    ))}
  </div>
);

const PatientInfo = ({ data, update }) => (
  <div className="fade-in">
    <h2 style={{ marginBottom: '20px' }}>Patient Information</h2>
    <div className="form-group">
      <label className="form-label">Full Name</label>
      <input type="text" className="form-input" placeholder="Enter patient name" value={data.name || ''} onChange={e => update({ name: e.target.value })} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <div className="form-group">
        <label className="form-label">Age</label>
        <input type="number" className="form-input" placeholder="Age" value={data.age || ''} onChange={e => update({ age: e.target.value })} />
      </div>
      <div className="form-group">
        <label className="form-label">Gender</label>
        <select className="form-input" value={data.gender || ''} onChange={e => update({ gender: e.target.value })}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
    <div className="form-group">
      <label className="form-label">Contact Number</label>
      <input type="tel" className="form-input" placeholder="Phone number" value={data.phone || ''} onChange={e => update({ phone: e.target.value })} />
    </div>
    <div className="form-group">
      <label className="form-label">District</label>
      <select className="form-input" value={data.district || ''} onChange={e => update({ district: e.target.value })}>
        <option value="">Select District</option>
        <option value="Visakhapatnam">Visakhapatnam</option>
        <option value="Vijayawada">Vijayawada</option>
        <option value="Guntur">Guntur</option>
        <option value="Tirupati">Tirupati</option>
        {/* ... others */}
      </select>
    </div>
  </div>
);

const Symptoms = ({ data, update }) => {
  const symptoms = ['Redness', 'Watering', 'Pain / Discomfort', 'Photophobia', 'Headache', 'Eye strain', 'Blurred Vision', 'Night Blindness'];
  const toggle = (s) => {
    const current = data.symptoms || [];
    if (current.includes(s)) update({ symptoms: current.filter(x => x !== s) });
    else update({ symptoms: [...current, s] });
  };
  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '12px' }}>Complaints & Symptoms</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>Select all that apply to the patient.</p>
      <div className="tag-group">
        {symptoms.map(s => (
          <div key={s} className={`tag-item ${(data.symptoms || []).includes(s) ? 'selected' : ''}`} onClick={() => toggle(s)}>
            {s}
          </div>
        ))}
      </div>
      <div className="form-group" style={{ marginTop: '24px' }}>
        <label className="form-label">Other Symptoms / Remarks</label>
        <textarea className="form-input" rows="3" placeholder="Specify any other symptoms..." value={data.otherSymptoms || ''} onChange={e => update({ otherSymptoms: e.target.value })}></textarea>
      </div>
    </div>
  );
};

const HistorySection = ({ data, update }) => {
  const ocular = ['Refractive error', 'Cataract', 'Glaucoma', 'Trauma', 'Surgery', 'Contact lens', 'Prosthesis'];
  const medical = ['Diabetes', 'Hypertension', 'Thyroid', 'Autoimmune'];
  
  const toggleOcular = (item) => {
    const current = data.ocularHistory || [];
    if (current.includes(item)) update({ ocularHistory: current.filter(x => x !== item) });
    else update({ ocularHistory: [...current, item] });
  };

  const toggleMedical = (item) => {
    const current = data.medicalHistory || [];
    if (current.includes(item)) update({ medicalHistory: current.filter(x => x !== item) });
    else update({ medicalHistory: [...current, item] });
  };

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '20px' }}>Ocular & Medical History</h2>
      <h4 style={{ marginBottom: '12px', color: 'var(--primary)' }}>Ocular History</h4>
      <div className="tag-group" style={{ marginBottom: '24px' }}>
        {ocular.map(s => (
          <div key={s} className={`tag-item ${(data.ocularHistory || []).includes(s) ? 'selected' : ''}`} onClick={() => toggleOcular(s)}>
            {s}
          </div>
        ))}
      </div>
      <h4 style={{ marginBottom: '12px', color: 'var(--primary)' }}>Medical History</h4>
      <div className="tag-group">
        {medical.map(s => (
          <div key={s} className={`tag-item ${(data.medicalHistory || []).includes(s) ? 'selected' : ''}`} onClick={() => toggleMedical(s)}>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

const VisualAcuity = ({ data, update }) => {
  const updateVA = (eye, field, val) => {
    const va = data.visualAcuity || { OD: {}, OS: {} };
    va[eye][field] = val;
    update({ visualAcuity: { ...va } });
  };

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '20px' }}>Visual Acuity</h2>
      <div className="card">
        <h4 className="eye-header">Right Eye (OD)</h4>
        <div className="eye-grid">
          <div><label className="form-label">UCVA</label><input type="text" className="form-input" placeholder="6/6" onChange={e => updateVA('OD', 'ucva', e.target.value)} /></div>
          <div><label className="form-label">BCVA</label><input type="text" className="form-input" placeholder="6/6" onChange={e => updateVA('OD', 'bcva', e.target.value)} /></div>
          <div><label className="form-label">Pinhole</label><input type="text" className="form-input" placeholder="6/6" onChange={e => updateVA('OD', 'pinhole', e.target.value)} /></div>
        </div>
        <h4 className="eye-header">Left Eye (OS)</h4>
        <div className="eye-grid">
          <div><label className="form-label">UCVA</label><input type="text" className="form-input" placeholder="6/6" onChange={e => updateVA('OS', 'ucva', e.target.value)} /></div>
          <div><label className="form-label">BCVA</label><input type="text" className="form-input" placeholder="6/6" onChange={e => updateVA('OS', 'bcva', e.target.value)} /></div>
          <div><label className="form-label">Pinhole</label><input type="text" className="form-input" placeholder="6/6" onChange={e => updateVA('OS', 'pinhole', e.target.value)} /></div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    ocularHistory: [],
    medicalHistory: [],
    symptoms: [],
    visualAcuity: { OD: {}, OS: {} }
  });

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const steps = [
    { title: 'Dashboard', icon: <Activity /> },
    { title: 'Patient Info', icon: <User /> },
    { title: 'Symptoms', icon: <Droplets /> },
    { title: 'History', icon: <History /> },
    { title: 'Visual Acuity', icon: <Eye /> },
    { title: 'Refraction', icon: <Zap /> },
    { title: 'Prescription', icon: <FileText /> },
    { title: 'Examination', icon: <Stethoscope /> },
    { title: 'IOP & Diagnosis', icon: <Clipboard /> },
    { title: 'Review', icon: <PenTool /> },
  ];

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0: return <Dashboard onNewScreening={() => setStep(1)} />;
      case 1: return <PatientInfo data={formData} update={updateFormData} />;
      case 2: return <Symptoms data={formData} update={updateFormData} />;
      case 3: return <HistorySection data={formData} update={updateFormData} />;
      case 4: return <VisualAcuity data={formData} update={updateFormData} />;
      default: return <div className="fade-in"><h2 style={{textAlign: 'center', marginTop: '50px', color: 'var(--text-muted)'}}>Step {step} Implementation in Progress...</h2></div>;
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {step > 0 && <ChevronLeft onClick={prevStep} style={{ cursor: 'pointer' }} />}
          <h1>{step === 0 ? 'Vision Outreach' : steps[step].title}</h1>
        </div>
        <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
          <Search size={20} />
          <Bell size={20} />
          <Menu size={20} />
        </div>
      </header>

      {step > 0 && (
        <div style={{ padding: '20px 20px 0 20px' }}>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${(step / (steps.length - 1)) * 100}%` }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span>Step {step} of {steps.length - 1}</span>
            <span>{Math.round((step / (steps.length - 1)) * 100)}% Complete</span>
          </div>
        </div>
      )}

      <main className="content">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {step > 0 && (
        <footer style={{ position: 'fixed', bottom: 0, left: 'auto', right: 'auto', width: '100%', maxWidth: '480px', padding: '20px', background: 'white', borderTop: '1px solid var(--border)', display: 'flex', gap: '16px', z heartIndex: 100 }}>
          {step < steps.length - 1 ? (
            <button className="btn btn-primary btn-block" onClick={nextStep}>
              Continue <ChevronRight size={18} />
            </button>
          ) : (
            <button className="btn btn-primary btn-block" style={{ background: 'var(--accent)' }} onClick={() => alert('Form Submitted!')}>
              <CheckCircle size={18} /> Finish & Sync
            </button>
          )}
        </footer>
      )}

      {step === 0 && (
        <nav style={{ position: 'fixed', bottom: 0, left: 'auto', right: 'auto', width: '100%', maxWidth: '480px', padding: '12px 20px', background: 'white', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--primary)', fontSize: '0.7rem' }}>
            <Activity size={24} />
            <span>Home</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            <Search size={24} />
            <span>Search</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            <History size={24} />
            <span>Records</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            <User size={24} />
            <span>Profile</span>
          </div>
        </nav>
      )}
    </div>
  );
}
