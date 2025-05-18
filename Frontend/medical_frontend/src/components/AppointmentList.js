import React, { useEffect, useState } from 'react'; 
import api from '../services/api'; 
import styles from './AppointmentList.module.css';
import { useRouter } from 'next/router'; // Import useRouter


export default function AppointmentList() { 
  const [appointments, setAppointments] = useState([]); 
  const [doctors, setDoctors] = useState([]); 
  const [selectedDoctor, setSelectedDoctor] = useState(''); 
  const [selectedDate, setSelectedDate] = useState(''); 
  const router = useRouter(); // Initialize router

  const fetchAppointments = async () => { 
    try { 
      const params = {}; 
      if (selectedDoctor) params.doctor = selectedDoctor; 
      if (selectedDate) params.date = selectedDate; 
      const res = await api.get('/appointments/', { params }); 
      setAppointments(res.data); 
    } catch (err) { 
      console.error('Error fetching appointments:', err); 
    } 
  }; 

  const fetchDoctors = async () => { 
    try { 
      const res = await api.get('/doctors/'); 
      setDoctors(res.data); 
    } catch (err) { 
      console.error('Error fetching doctors:', err); 
    } 
  }; 

  useEffect(() => { 
    fetchDoctors(); 
    fetchAppointments(); 
  }, []); 

  useEffect(() => { 
    fetchAppointments(); 
  }, [selectedDoctor, selectedDate]); 

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Appointments</h1>
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filter by Doctor</label>
            <select
              className={styles.filterSelect}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              value={selectedDoctor}
            >
              <option value="">All Doctors</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>{doc.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filter by Date</label>
            <input
              type="date"
              className={styles.filterDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            
          </div>
        </div>
      </div>
      <div>
         <button 
            onClick={() => router.push('/new')} 
            className={styles.newAppointmentButton}
          >
            + New Appointment
          </button>
      </div>

      <ul className={styles.appointmentList}>
        {appointments.map((appt) => (
          <li key={appt.id} className={styles.appointmentCard}>
            <p className={styles.cardField}>
              <strong>Patient:</strong> {appt.patient_name}
            </p>
            <p className={styles.cardField}>
              <strong>Doctor:</strong> {appt.doctor_name}
            </p>
            <p className={styles.cardField}>
                <strong>Specialization:</strong> {appt.doctor_specialization}
            </p>
            <p className={styles.cardField}>
              <strong>Date:</strong> {appt.date}
            </p>
            <p className={styles.cardField}>
              <strong>Time:</strong> {appt.time_slot}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}