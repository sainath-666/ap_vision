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
  Zap,
  MapPin,
  Calendar
} from 'lucide-react';

// --- Sub-components for each step ---

const Dashboard = ({ onNewScreening }) => (
  <div className="fade-in">
    <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '24px', background: 'linear-gradient(135deg, #0066FF, #00D1FF)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.2 }}>
        <Eye size={120} />
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Vision Outreach</h2>
      <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Illuminating Lives Across All 26 Districts of Andhra Pradesh.</p>
      <div style={{ marginTop: '24px', display: 'flex', gap: '20px' }}>
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>1,284</div>
          <div style={{ fontSize: '0.7rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Screenings Today</div>
        </div>
        <div style={{ width: '1px', background: 'rgba(255,255,255,0.3)' }}></div>
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>942</div>
          <div style={{ fontSize: '0.7rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Spectacles Sent</div>
        </div>
      </div>
    </div>

    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="btn btn-primary btn-block" 
      style={{ height: '64px', borderRadius: '20px', marginBottom: '32px', boxShadow: '0 10px 15px -3px rgba(0, 102, 255, 0.3)' }} 
      onClick={onNewScreening}
    >
      <Plus size={24} /> Start New Examination
    </motion.div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <h3 style={{ fontWeight: 700 }}>Recent Records</h3>
      <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>View All</span>
    </div>

    {[
      { name: 'Ramesh Babu', id: 'AP-26-4829', time: '2 hrs ago', status: 'Synced' },
      { name: 'Sita Devi', id: 'AP-26-4830', time: '5 hrs ago', status: 'Synced' },
      { name: 'Anil Kumar', id: 'AP-26-4831', time: 'Yesterday', status: 'Pending' }
    ].map((item, i) => (
      <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '16px' }}>
        <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '14px', color: 'var(--primary)' }}>
          <User size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600 }}>{item.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {item.id} • {item.time}</div>
        </div>
        <div style={{ color: item.status === 'Synced' ? 'var(--accent)' : 'var(--warning)', fontWeight: 600, fontSize: '0.8rem' }}>
          {item.status}
        </div>
      </div>
    ))}
  </div>
);

const PatientInfo = ({ data, update }) => (
  <div className="fade-in">
    <h2 style={{ marginBottom: '8px' }}>Patient Details</h2>
    <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>Basic identification and demographic information.</p>
    
    <div className="form-group">
      <label className="form-label">Full Name</label>
      <input type="text" className="form-input" placeholder="e.g. Ramesh Babu" value={data.name || ''} onChange={e => update({ name: e.target.value })} />
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
      <input type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" value={data.phone || ''} onChange={e => update({ phone: e.target.value })} />
    </div>
    
    <div className="form-group">
      <label className="form-label">District</label>
      <div style={{ position: 'relative' }}>
        <select className="form-input" value={data.district || ''} onChange={e => update({ district: e.target.value })}>
          <option value="">Select District</option>
          <option value="Visakhapatnam">Visakhapatnam</option>
          <option value="Vijayawada">Vijayawada</option>
          <option value="Guntur">Guntur</option>
          <option value="Tirupati">Tirupati</option>
          <option value="Nellore">Nellore</option>
          <option value="Kurnool">Kurnool</option>
        </select>
      </div>
    </div>
  </div>
);

const Symptoms = ({ data, update }) => {
  const symptoms = ['Redness', 'Watering', 'Pain / Discomfort', 'Photophobia', 'Headache', 'Eye strain', 'Blurred Vision', 'Night Blindness', 'Flash of light', 'Floaters'];
  const toggle = (s) => {
    const current = data.symptoms || [];
    if (current.includes(s)) update({ symptoms: current.filter(x => x !== s) });
    else update({ symptoms: [...current, s] });
  };
  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '8px' }}>Complaints</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>Tick all relevant symptoms reported by the patient.</p>
      <div className="tag-group">
        {symptoms.map(s => (
          <motion.div 
            whileTap={{ scale: 0.95 }}
            key={s} 
            className={`tag-item ${(data.symptoms || []).includes(s) ? 'selected' : ''}`} 
            onClick={() => toggle(s)}
          >
            {s}
          </motion.div>
        ))}
      </div>
      <div className="form-group" style={{ marginTop: '32px' }}>
        <label className="form-label">Additional Remarks</label>
        <textarea className="form-input" rows="3" placeholder="Specify any other details..." value={data.otherSymptoms || ''} onChange={e => update({ otherSymptoms: e.target.value })}></textarea>
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
      <h2 style={{ marginBottom: '24px' }}>Medical History</h2>
      
      <div className="card" style={{ marginBottom: '24px', borderLeft: '4px solid var(--primary)' }}>
        <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Eye size={18} color="var(--primary)" /> Ocular History</h4>
        <div className="tag-group">
          {ocular.map(s => (
            <div key={s} className={`tag-item ${(data.ocularHistory || []).includes(s) ? 'selected' : ''}`} onClick={() => toggleOcular(s)}>
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
        <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Stethoscope size={18} color="var(--accent)" /> Systemic History</h4>
        <div className="tag-group">
          {medical.map(s => (
            <div key={s} className={`tag-item ${(data.medicalHistory || []).includes(s) ? 'selected' : ''}`} onClick={() => toggleMedical(s)}>
              {s}
            </div>
          ))}
        </div>
      </div>
      
      <div className="form-group" style={{ marginTop: '24px' }}>
        <label className="form-label">Current Medications</label>
        <input type="text" className="form-input" placeholder="List any medications..." />
      </div>
    </div>
  );
};

const VisualAcuity = ({ data, update }) => {
  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '8px' }}>Visual Acuity</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>Record distance and near vision findings.</p>
      
      <div className="card">
        <h4 className="eye-header">Right Eye (OD)</h4>
        <div className="eye-grid">
          <div><label className="form-label">UCVA</label><input type="text" className="form-input" placeholder="6/..." /></div>
          <div><label className="form-label">BCVA</label><input type="text" className="form-input" placeholder="6/..." /></div>
          <div><label className="form-label">Pinhole</label><input type="text" className="form-input" placeholder="6/..." /></div>
        </div>
        <div style={{ marginTop: '12px' }}>
          <label className="form-label">Near Vision (OD)</label>
          <input type="text" className="form-input" placeholder="N6, N8..." />
        </div>
      </div>

      <div className="card">
        <h4 className="eye-header" style={{ borderBottomColor: '#FFC107' }}>Left Eye (OS)</h4>
        <div className="eye-grid">
          <div><label className="form-label">UCVA</label><input type="text" className="form-input" placeholder="6/..." /></div>
          <div><label className="form-label">BCVA</label><input type="text" className="form-input" placeholder="6/..." /></div>
          <div><label className="form-label">Pinhole</label><input type="text" className="form-input" placeholder="6/..." /></div>
        </div>
        <div style={{ marginTop: '12px' }}>
          <label className="form-label">Near Vision (OS)</label>
          <input type="text" className="form-input" placeholder="N6, N8..." />
        </div>
      </div>
    </div>
  );
};

const Refraction = ({ data, update }) => (
  <div className="fade-in">
    <h2 style={{ marginBottom: '24px' }}>Refraction</h2>
    
    <div className="card">
      <h4 style={{ color: 'var(--primary)', marginBottom: '16px' }}>Subjective Refraction</h4>
      <div className="eye-header">Right Eye (OD)</div>
      <div className="eye-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
        <div><label className="form-label">Sph</label><input type="text" className="form-input" placeholder="0.00" /></div>
        <div><label className="form-label">Cyl</label><input type="text" className="form-input" placeholder="0.00" /></div>
        <div><label className="form-label">Axis</label><input type="text" className="form-input" placeholder="180" /></div>
        <div><label className="form-label">VA</label><input type="text" className="form-input" placeholder="6/6" /></div>
      </div>
      <div className="eye-header" style={{ marginTop: '16px' }}>Left Eye (OS)</div>
      <div className="eye-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
        <div><label className="form-label">Sph</label><input type="text" className="form-input" placeholder="0.00" /></div>
        <div><label className="form-label">Cyl</label><input type="text" className="form-input" placeholder="0.00" /></div>
        <div><label className="form-label">Axis</label><input type="text" className="form-input" placeholder="180" /></div>
        <div><label className="form-label">VA</label><input type="text" className="form-input" placeholder="6/6" /></div>
      </div>
    </div>
    
    <div className="form-group">
      <label className="form-label">Objective Remarks</label>
      <input type="text" className="form-input" placeholder="AR/Retinoscopy notes..." />
    </div>
  </div>
);

const Prescription = ({ data, update }) => {
  const lensTypes = ['Single Vision Dist', 'Single Vision Near', 'Bifocal', 'Progressive'];
  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '24px' }}>Final Prescription</h2>
      <div className="card" style={{ background: '#F0F9FF', borderColor: '#BAE6FD' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#0369A1' }}>RX RECORD</span>
          <span style={{ fontSize: '0.7rem', color: '#0369A1' }}>DATE: {new Date().toLocaleDateString()}</span>
        </div>
        <div className="eye-grid" style={{ gridTemplateColumns: '1fr 2fr 2fr 2fr 1fr', gap: '8px', fontSize: '0.7rem', fontWeight: 700, marginBottom: '8px' }}>
          <div>EYE</div><div>SPH</div><div>CYL</div><div>AXIS</div><div>ADD</div>
        </div>
        <div className="eye-grid" style={{ gridTemplateColumns: '1fr 2fr 2fr 2fr 1fr', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.75rem' }}>OD</div>
          <input type="text" className="form-input" style={{ padding: '8px' }} />
          <input type="text" className="form-input" style={{ padding: '8px' }} />
          <input type="text" className="form-input" style={{ padding: '8px' }} />
          <input type="text" className="form-input" style={{ padding: '8px' }} />
        </div>
        <div className="eye-grid" style={{ gridTemplateColumns: '1fr 2fr 2fr 2fr 1fr', gap: '8px', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '0.75rem' }}>OS</div>
          <input type="text" className="form-input" style={{ padding: '8px' }} />
          <input type="text" className="form-input" style={{ padding: '8px' }} />
          <input type="text" className="form-input" style={{ padding: '8px' }} />
          <input type="text" className="form-input" style={{ padding: '8px' }} />
        </div>
      </div>
      
      <div className="form-group" style={{ marginTop: '24px' }}>
        <label className="form-label">Lens Type</label>
        <div className="tag-group">
          {lensTypes.map(t => (
            <div key={t} className={`tag-item ${data.lensType === t ? 'selected' : ''}`} onClick={() => update({ lensType: t })}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Examination = () => (
  <div className="fade-in">
    <h2 style={{ marginBottom: '24px' }}>Segment Evaluation</h2>
    <div className="card">
      <h4 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Anterior Segment</h4>
      {['Lids/Adnexa', 'Conjunctiva', 'Cornea', 'Iris', 'Lens'].map(item => (
        <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.9rem' }}>{item}</span>
          <select className="form-input" style={{ width: '140px', padding: '6px 10px' }}>
            <option>Normal</option>
            <option>Abnormal</option>
            <option>Suspicious</option>
          </select>
        </div>
      ))}
    </div>
    <div className="card">
      <h4 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Posterior Segment</h4>
      <div className="form-group">
        <label className="form-label">Optic Disc / Fundus</label>
        <input type="text" className="form-input" placeholder="WNL (Within Normal Limits)" />
      </div>
    </div>
  </div>
);

const DiagnosisStep = () => (
  <div className="fade-in">
    <h2 style={{ marginBottom: '24px' }}>Final Assessment</h2>
    <div className="card">
      <label className="form-label">Primary Diagnosis</label>
      <select className="form-input" style={{ marginBottom: '16px' }}>
        <option>Select Diagnosis</option>
        <option>Refractive Error (Myopia/Hyperopia)</option>
        <option>Presbyopia</option>
        <option>Cataract (Immature/Mature)</option>
        <option>Glaucoma Suspect</option>
        <option>Allergic Conjunctivitis</option>
      </select>
      
      <label className="form-label">IOP (Goldmann/NCT)</label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>OD</span>
          <input type="text" className="form-input" placeholder="mmHg" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>OS</span>
          <input type="text" className="form-input" placeholder="mmHg" />
        </div>
      </div>
    </div>
    
    <div className="form-group">
      <label className="form-label">Management / Advice</label>
      <textarea className="form-input" rows="4" placeholder="Advice given to patient..."></textarea>
    </div>
  </div>
);

const Review = ({ data }) => (
  <div className="fade-in">
    <h2 style={{ marginBottom: '24px' }}>Review & Authenticate</h2>
    <div className="card" style={{ background: 'var(--primary-light)', border: 'none', padding: '16px', borderRadius: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>{data.name || 'Ramesh Babu'}</div>
          <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>{data.age || '45'} yrs • {data.gender || 'Male'}</div>
        </div>
        <div style={{ background: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700 }}>
          ID: AP-26-001
        </div>
      </div>
    </div>
    
    <div className="form-group">
      <label className="form-label">Examining Clinician</label>
      <input type="text" className="form-input" defaultValue="Dr. Satish Kumar, PMOA" />
    </div>
    
    <label className="form-label">Authorized Signature</label>
    <div className="signature-area" style={{ borderStyle: 'solid', borderWidth: '1px' }}>
      <div style={{ textAlign: 'center' }}>
        <PenTool size={24} style={{ color: 'var(--border)', marginBottom: '8px' }} />
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sign on screen to validate record</div>
      </div>
    </div>
    
    <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <input type="checkbox" id="confirm" style={{ width: '20px', height: '20px' }} />
      <label htmlFor="confirm" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        I certify that this examination complies with eHR Standards-2016.
      </label>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    district: '',
    symptoms: [],
    ocularHistory: [],
    medicalHistory: [],
    lensType: 'Single Vision Dist'
  });

  const steps = [
    'Dashboard',
    'Patient Info',
    'Symptoms',
    'History',
    'Visual Acuity',
    'Refraction',
    'Prescription',
    'Examination',
    'Assessment',
    'Review'
  ];

  const updateData = (newData) => setFormData(prev => ({ ...prev, ...newData }));
  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0: return <Dashboard onNewScreening={() => setStep(1)} />;
      case 1: return <PatientInfo data={formData} update={updateData} />;
      case 2: return <Symptoms data={formData} update={updateData} />;
      case 3: return <HistorySection data={formData} update={updateData} />;
      case 4: return <VisualAcuity data={formData} update={updateData} />;
      case 5: return <Refraction data={formData} update={updateData} />;
      case 6: return <Prescription data={formData} update={updateData} />;
      case 7: return <Examination data={formData} update={updateData} />;
      case 8: return <DiagnosisStep data={formData} update={updateData} />;
      case 9: return <Review data={formData} />;
      default: return null;
    }
  };

  return (
    <div className="app-container">
      <header className="header" style={{ height: '70px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {step > 0 ? (
            <motion.div whileTap={{ scale: 0.8 }} onClick={prevStep} style={{ cursor: 'pointer', padding: '8px', background: '#F1F5F9', borderRadius: '12px' }}>
              <ChevronLeft size={20} />
            </motion.div>
          ) : (
            <div style={{ background: 'var(--primary)', color: 'white', padding: '8px', borderRadius: '12px' }}>
              <Eye size={20} />
            </div>
          )}
          <h1 style={{ fontSize: '1.1rem' }}>{step === 0 ? 'AP Vision Outreach' : steps[step]}</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)' }}>
          <Search size={20} />
          <Bell size={20} />
          <Menu size={20} />
        </div>
      </header>

      {step > 0 && (
        <div style={{ padding: '16px 20px 0 20px' }}>
          <div className="progress-container" style={{ marginBottom: '8px' }}>
            <div className="progress-bar" style={{ width: `${(step / (steps.length - 1)) * 100}%` }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Step {step} of {steps.length - 1}</span>
            <span>{Math.round((step / (steps.length - 1)) * 100)}% Complete</span>
          </div>
        </div>
      )}

      <main className="content" style={{ paddingBottom: step === 0 ? '100px' : '120px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {step > 0 && (
        <footer style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: '480px', padding: '24px 20px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--border)', display: 'flex', gap: '16px', zIndex: 100 }}>
          {step < steps.length - 1 ? (
            <button className="btn btn-primary btn-block" style={{ height: '56px', borderRadius: '16px' }} onClick={nextStep}>
              Next Step <ChevronRight size={18} />
            </button>
          ) : (
            <button className="btn btn-primary btn-block" style={{ height: '56px', borderRadius: '16px', background: 'var(--accent)' }} onClick={() => alert('Examination data synced to EMR successfully!')}>
              <CheckCircle size={18} /> Finalize & Sync
            </button>
          )}
        </footer>
      )}

      {step === 0 && (
        <nav style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: '480px', padding: '16px 20px 24px', background: 'white', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--primary)', gap: '4px' }}>
            <Activity size={24} />
            <span style={{ fontSize: '0.65rem', fontWeight: 700 }}>Home</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)', gap: '4px' }}>
            <MapPin size={24} />
            <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Camps</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)', gap: '4px' }}>
            <Calendar size={24} />
            <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Schedule</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)', gap: '4px' }}>
            <User size={24} />
            <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Account</span>
          </div>
        </nav>
      )}
    </div>
  );
}
