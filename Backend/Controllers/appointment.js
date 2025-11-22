// Controllers/appointment.js
const Appointment = require('../Models/AppointmentsDB');
const Pet = require('../Models/PetDB');
const Vet = require('../Models/VetDB');
const Groomer = require('../Models/GroomerDB');
const Trainer = require('../Models/TrainerDB');

// Utility to safely pick ID from req.verified or params/body
const getUserIdFromReq = (req) => {
  return req?.verified?.id || req.params.userId || req.body.user_id || null;
};

const getAuthIdFromReq = (req) => {
  return req?.verified?.id || req.params.authId || req.body.authority_id || null;
};

// =============================
// CREATE APPOINTMENT
// =============================
const createAppointment = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }
    // console.log("Signal Received");
    const {
      type,
      authority_id,
      date,
      time,
      pet_id,
      status,
      description,
      serviceCost,
      serviceName,
      addons,
    } = req.body;

    const appointment = await Appointment.create({
      user_id: userId,
      type,
      authority_id,
      date,
      time,
      pet_id,
      status,        // optional, mongoose default = 'pending'
      description,
      serviceCost,
      serviceName,
      addons,
    });

    return res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment,
    });
  } catch (err) {
    console.error('Create appointment error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to create appointment',
    });
  }
};

// =============================
// GET BY USER (all appointments for a user)
// =============================
const getAppointmentsByUser = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    // 1) Get appointments and populate pet + authority
    const rawAppointments = await Appointment.find({ user_id: userId })
      .sort({ date: 1, time: 1 })
      .populate('pet_id', 'name age breed category')   // only these fields
      .populate('authority_id', 'name city state phone profilePic address locality'); // adjust fields to your schema

    // 2) Shape data for frontend
    const appointments = rawAppointments.map((appointment) => {
      const providerDoc = appointment.authority_id;
      const petDoc = appointment.pet_id;

      const provider = providerDoc
        ? {
            id: providerDoc._id,
            name: providerDoc.name,
            // price: appointment.serviceCost, // or providerDoc.basePrice if you prefer
            city: providerDoc.city,
            state:providerDoc.state,
            avatar: providerDoc.profilePic
          }
        : null;

      // ---- pet fields ----
      const pet = petDoc
        ? {
            id: petDoc._id,
            name: petDoc.name,
            age: petDoc.age,
            breed: petDoc.breed,
            category: petDoc.category,
          }
        : null;

      // 3) Final appointment shape
      return {
        id: appointment._id,
        type: appointment.type,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        serviceName: appointment.serviceName,
        serviceCost: appointment.serviceCost,
        addons: appointment.addons || [],
        description: appointment.description || 'Please provide details.',
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,

        provider, // { id, name, price, city, state, avatar:profilePic }
        pet,      // { id, name, age, breed, category }
      };
    });

    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (err) {
    console.error('Get appointments by user error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments for user',
    });
  }
};

// =============================
// GET BY ID (single appointment)
// =============================
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    const userId = getUserIdFromReq(req);
    if(appointment?.user_id.toString() !== userId.toString()){
      return res.status(403).json({
        success: false,
        message: 'Access denied to this appointment',
      });
    }
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (err) {
    console.error('Get appointment by id error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment',
    });
  }
};

// =============================
// GET BY AUTHORITY (vet/groomer/trainer/daycare)
// =============================
// Optionally you can pass `type` in query or params to filter more strictly.
const getAppointmentsByAuthId = async (req, res) => {
  try {
    const authId = getAuthIdFromReq(req);
    const type = req.params.type || req.query.type || undefined;

    if (!authId) {
      return res.status(400).json({
        success: false,
        message: 'Authority ID is required',
      });
    }

    const filter = { authority_id: authId };
    if (type) filter.type = type; // e.g. 'vet' | 'groomer' | ...

    const appointments = await Appointment.find(filter)
      .sort({ date: 1, time: 1 });

    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (err) {
    console.error('Get appointments by authority error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments for authority',
    });
  }
};

// =============================
// UPDATE APPOINTMENT
// =============================
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // You can whitelist fields if you want stricter control
    const updates = {
      type: req.body.type,
      authority_id: req.body.authority_id,
      date: req.body.date,
      time: req.body.time,
      pet_id: req.body.pet_id,
      status: req.body.status,
      description: req.body.description,
      serviceCost: req.body.serviceCost,
      serviceName: req.body.serviceName,
      addons: req.body.addons,
    };

    // Remove undefined keys so we don't overwrite with undefined
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment,
    });
  } catch (err) {
    console.error('Update appointment error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update appointment',
    });
  }
};

// =============================
// DELETE APPOINTMENT
// =============================
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully',
    });
  } catch (err) {
    console.error('Delete appointment error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete appointment',
    });
  }
};

module.exports = {
  createAppointment,
  getAppointmentsByUser,
  getAppointmentById,
  getAppointmentsByAuthId,
  updateAppointment,
  deleteAppointment,
};
