import React, { useEffect, useState } from 'react';
import api from '../services/api';
import styles from './AppointmentForm.module.css';
import { useRouter } from 'next/router'; // ✅ Import this

export default function AppointmentForm() {
  const router = useRouter(); // ✅ Initialize router
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patient_name: '',
    doctor: '',
    date: '',
    time_slot: '',
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get('/doctors/');
        setDoctors(res.data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments/', form);
      alert('Appointment created!');
      setForm({
        patient_name: '',
        doctor: '',
        date: '',
        time_slot: '',
      });
      router.push('/');
    } catch (err) {
      console.error('Error creating appointment:', err);
      alert('Failed to create appointment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
  <h2>Create Appointment</h2>
  
  <div className={styles.formGroup}>
    <label className={styles.formLabel}>Patient Name</label>
    <input
      type="text"
      name="patient_name"
      placeholder="Enter patient name"
      value={form.patient_name}
      onChange={handleChange}
      required
    />
  </div>

  <div className={styles.formGroup}>
    <label className={styles.formLabel}>Doctor</label>
    <select
      name="doctor"
      value={form.doctor}
      onChange={handleChange}
      required
    >
      <option value="">Select Doctor</option>
      {doctors.map((doc) => (
        <option key={doc.id} value={doc.id}>{doc.name}</option>
      ))}
    </select>
  </div>

  <div className={styles.formGroup}>
    <label className={styles.formLabel}>Date</label>
    <input
      type="date"
      name="date"
      value={form.date}
      onChange={handleChange}
      required
    />
  </div>

  <div className={styles.formGroup}>
    <label className={styles.formLabel}>Time</label>
    <input
      type="time"
      name="time_slot"
      value={form.time_slot}
      onChange={handleChange}
      required
    />
  </div>

    <button type="submit">Submit</button>
    <button 
        onClick={() => router.push('/')} 
        className={styles.newAppointmentButton}
        >
        Appointment List
        </button>
</form>
  );
}