import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:signature/signature.dart';

void main() {
  runApp(const VisionApp());
}

class VisionApp extends StatelessWidget {
  const VisionApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AP Vision Outreach',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0066FF),
          primary: const Color(0xFF0066FF),
          secondary: const Color(0xFF00D1FF),
        ),
        useMaterial3: true,
        textTheme: GoogleFonts.interTextTheme(),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          foregroundColor: Color(0xFF1E293B),
          elevation: 0,
          centerTitle: false,
        ),
      ),
      home: const DashboardScreen(),
    );
  }
}

// --- Dashboard Screen ---

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Vision Outreach', style: TextStyle(fontWeight: FontWeight.w800)),
        actions: [
          IconButton(icon: const Icon(LucideIcons.search), onPressed: () {}),
          IconButton(icon: const Icon(LucideIcons.bell), onPressed: () {}),
          IconButton(icon: const Icon(LucideIcons.menu), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF0066FF), Color(0xFF00D1FF)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(24),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Illuminating Lives',
                    style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800),
                  ),
                  const Text(
                    'Across All 26 Districts of AP',
                    style: TextStyle(color: Colors.white70, fontSize: 14),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    children: [
                      _buildStat('1,284', 'SCREENINGS'),
                      const SizedBox(width: 20),
                      Container(width: 1, height: 30, color: Colors.white24),
                      const SizedBox(width: 20),
                      _buildStat('942', 'SPECTACLES'),
                    ],
                  )
                ],
              ),
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => const ExaminationFormScreen()));
              },
              icon: const Icon(LucideIcons.plus),
              label: const Text('Start New Examination'),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF0066FF),
                foregroundColor: Colors.white,
                minimumSize: const Size(double.infinity, 60),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                elevation: 4,
              ),
            ),
            const SizedBox(height: 32),
            const Text('Recent Records', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
            const SizedBox(height: 16),
            _buildRecordCard('Ramesh Babu', 'AP-26-4829', '2 hrs ago', 'Synced'),
            _buildRecordCard('Sita Devi', 'AP-26-4830', '5 hrs ago', 'Synced'),
            _buildRecordCard('Anil Kumar', 'AP-26-4831', 'Yesterday', 'Pending'),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFF0066FF),
        unselectedItemColor: Colors.blueGrey,
        showSelectedLabels: true,
        showUnselectedLabels: true,
        items: const [
          BottomNavigationBarItem(icon: Icon(LucideIcons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.mapPin), label: 'Camps'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.calendar), label: 'Schedule'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.user), label: 'Account'),
        ],
      ),
    );
  }

  Widget _buildStat(String value, String label) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(value, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700)),
        Text(label, style: const TextStyle(color: Colors.white60, fontSize: 10, fontWeight: FontWeight.w600)),
      ],
    );
  }

  Widget _buildRecordCard(String name, String id, String time, String status) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(color: const Color(0xFFE0E7FF), borderRadius: BorderRadius.circular(12)),
            child: const Icon(LucideIcons.user, color: Color(0xFF0066FF), size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(fontWeight: FontWeight.w600)),
                Text('ID: $id • $time', style: const TextStyle(fontSize: 12, color: Colors.blueGrey)),
              ],
            ),
          ),
          Text(
            status,
            style: TextStyle(
              color: status == 'Synced' ? const Color(0xFF10B981) : const Color(0xFFF59E0B),
              fontWeight: FontWeight.w600,
              fontSize: 12,
            ),
          )
        ],
      ),
    );
  }
}

// --- Multi-Step Form Screen ---

class ExaminationFormScreen extends StatefulWidget {
  const ExaminationFormScreen({super.key});

  @override
  State<ExaminationFormScreen> createState() => _ExaminationFormScreenState();
}

class _ExaminationFormScreenState extends State<ExaminationFormScreen> {
  int _currentStep = 0;
  final List<String> _stepTitles = [
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(_stepTitles[_currentStep], style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
        leading: IconButton(
          icon: const Icon(LucideIcons.chevronLeft),
          onPressed: () {
            if (_currentStep > 0) {
              setState(() => _currentStep--);
            } else {
              Navigator.pop(context);
            }
          },
        ),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            child: LinearPercentIndicator(
              lineHeight: 8.0,
              percent: (_currentStep + 1) / _stepTitles.length,
              backgroundColor: const Color(0xFFE2E8F0),
              progressColor: const Color(0xFF0066FF),
              barRadius: const Radius.circular(10),
              animation: true,
              animateFromLastPercent: true,
            ),
          ),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: _buildStepContent(),
            ),
          ),
          _buildFooter(),
        ],
      ),
    );
  }

  Widget _buildStepContent() {
    switch (_currentStep) {
      case 0: return _buildPatientInfo();
      case 1: return _buildSymptoms();
      case 2: return _buildHistory();
      case 3: return _buildVisualAcuity();
      case 8: return _buildReview();
      default:
        return Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(LucideIcons.construction, size: 64, color: Colors.blueGrey),
              const SizedBox(height: 16),
              Text('${_stepTitles[_currentStep]} Implementation', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
              const Text('Remaining form fields under development', style: TextStyle(color: Colors.blueGrey)),
            ],
          ),
        );
    }
  }

  Widget _buildPatientInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Patient Details', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
        const Text('Enter basic demographic information.', style: TextStyle(color: Colors.blueGrey)),
        const SizedBox(height: 24),
        _buildTextField('Full Name', 'e.g. Ramesh Babu'),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(child: _buildTextField('Age', 'Yrs')),
            const SizedBox(width: 16),
            Expanded(child: _buildDropdownField('Gender', ['Male', 'Female', 'Other'])),
          ],
        ),
        const SizedBox(height: 16),
        _buildTextField('Contact Number', '+91 XXXXX XXXXX'),
        const SizedBox(height: 16),
        _buildDropdownField('District', ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati']),
      ],
    );
  }

  Widget _buildSymptoms() {
    final symptoms = ['Redness', 'Watering', 'Pain', 'Photophobia', 'Headache', 'Blurry Vision'];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Complaints', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
        const Text('Select all relevant symptoms.', style: TextStyle(color: Colors.blueGrey)),
        const SizedBox(height: 24),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: symptoms.map((s) => _buildTag(s)).toList(),
        ),
        const SizedBox(height: 32),
        _buildTextField('Additional Remarks', 'Specify other symptoms...', maxLines: 3),
      ],
    );
  }

  Widget _buildHistory() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Medical History', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
        const SizedBox(height: 24),
        _buildSectionHeader(LucideIcons.eye, 'Ocular History', Colors.blue),
        Wrap(
          spacing: 10,
          children: ['Refractive error', 'Cataract', 'Glaucoma', 'Trauma'].map((s) => _buildTag(s)).toList(),
        ),
        const SizedBox(height: 24),
        _buildSectionHeader(LucideIcons.stethoscope, 'Systemic History', Colors.green),
        Wrap(
          spacing: 10,
          children: ['Diabetes', 'Hypertension', 'Thyroid'].map((s) => _buildTag(s)).toList(),
        ),
      ],
    );
  }

  Widget _buildVisualAcuity() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Visual Acuity', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
        const SizedBox(height: 24),
        _buildEyeCard('Right Eye (OD)'),
        const SizedBox(height: 16),
        _buildEyeCard('Left Eye (OS)'),
      ],
    );
  }

  Widget _buildReview() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Final Review', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
        const SizedBox(height: 24),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: const Color(0xFFE0E7FF), borderRadius: BorderRadius.circular(16)),
          child: const Row(
            children: [
              Icon(LucideIcons.user, color: Color(0xFF0066FF)),
              SizedBox(width: 16),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Ramesh Babu', style: TextStyle(fontWeight: FontWeight.w800, color: Color(0xFF1E293B))),
                  Text('45 yrs • Male', style: TextStyle(fontSize: 12, color: Colors.blueGrey)),
                ],
              )
            ],
          ),
        ),
        const SizedBox(height: 24),
        const Text('Authorized Signature', style: TextStyle(fontWeight: FontWeight.w700)),
        const SizedBox(height: 8),
        Container(
          height: 150,
          decoration: BoxDecoration(
            border: Border.all(color: const Color(0xFFE2E8F0)),
            borderRadius: BorderRadius.circular(12),
            color: const Color(0xFFF8FAFC),
          ),
          child: const Center(child: Text('Sign Here', style: TextStyle(color: Colors.blueGrey))),
        ),
        const SizedBox(height: 24),
        Row(
          children: [
            Checkbox(value: true, onChanged: (v) {}),
            const Expanded(child: Text('I certify that this examination complies with eHR Standards-2016.', style: TextStyle(fontSize: 12, color: Colors.blueGrey))),
          ],
        )
      ],
    );
  }

  Widget _buildFooter() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: Color(0xFFE2E8F0))),
      ),
      child: ElevatedButton(
        onPressed: () {
          if (_currentStep < _stepTitles.length - 1) {
            setState(() => _currentStep++);
          } else {
            ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Examination Synced Successfully!')));
            Navigator.pop(context);
          }
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: _currentStep == _stepTitles.length - 1 ? const Color(0xFF10B981) : const Color(0xFF0066FF),
          foregroundColor: Colors.white,
          minimumSize: const Size(double.infinity, 56),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        ),
        child: Text(_currentStep == _stepTitles.length - 1 ? 'Finalize & Sync' : 'Next Step'),
      ),
    );
  }

  // --- Helper Widgets ---

  Widget _buildTextField(String label, String hint, {int maxLines = 1}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
        const SizedBox(height: 8),
        TextField(
          maxLines: maxLines,
          decoration: InputDecoration(
            hintText: hint,
            filled: true,
            fillColor: const Color(0xFFF1F5F9),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          ),
        ),
      ],
    );
  }

  Widget _buildDropdownField(String label, List<String> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          decoration: BoxDecoration(color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(12)),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              isExpanded: true,
              value: items[0],
              items: items.map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(),
              onChanged: (v) {},
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildTag(String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFF1F5F9),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500)),
    );
  }

  Widget _buildSectionHeader(IconData icon, String title, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Icon(icon, size: 18, color: color),
          const SizedBox(width: 8),
          Text(title, style: TextStyle(color: color, fontWeight: FontWeight.w700)),
        ],
      ),
    );
  }

  Widget _buildEyeCard(String eye) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(eye, style: const TextStyle(color: Color(0xFF0066FF), fontWeight: FontWeight.w800, fontSize: 16)),
          const Divider(height: 24),
          Row(
            children: [
              Expanded(child: _buildTextField('UCVA', '6/..')),
              const SizedBox(width: 12),
              Expanded(child: _buildTextField('BCVA', '6/..')),
              const SizedBox(width: 12),
              Expanded(child: _buildTextField('Pinhole', '6/..')),
            ],
          )
        ],
      ),
    );
  }
}
