const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    userId: { type: String,required:true},
    task: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const Assignment=mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment