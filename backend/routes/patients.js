const express = require('express');
const { getpatientData, addpatientData, dashboardSend, dashboardSendold, availableDoctors,appointmentSlots,bookAppointment, dashboardPrescription} = require('../db/db');
const { verify_patient } = require('../middleware/verify_patient');
const eclinicRouter = require('./eclinic');
const patientRouter = express.Router();


patientRouter.get("/patientdata/:id",verify_patient,getpatientData);
// .post(addpatientData);//when the new patient ka data is posted
    
patientRouter.route('/dashboard/:id')//route for patient dashboard 
.get(verify_patient,dashboardSend);//sending upcoming appointments,prescriptions,tests and will have view details

patientRouter.route('/old/dashboard/:id')//route for patient dashboard 
.get(verify_patient,dashboardSendold);

patientRouter.route('/prescription/:id')
.get(verify_patient,dashboardPrescription);

// patientRouter.route('/appointments').get(availableDoctors);//appointments se doctors send
patientRouter.route('/availabledoctors').get(availableDoctors);//appointments se doctors send

patientRouter.route('/bookappointments/:id')
.get(verify_patient,appointmentSlots)//when id is passed of doctor in body the slots of his which  is booked and not booked is send to him and shd display only available slots for the patient
.post(verify_patient,bookAppointment);//when patient id is passed as post request to book appointment

//when a request to /patient/eclinic is made the eclinic router is used
patientRouter.use('/eclinic',eclinicRouter);


module.exports = patientRouter;