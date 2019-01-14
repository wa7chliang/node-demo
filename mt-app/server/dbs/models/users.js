import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: 'string',
    unique: true,
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true
  }
})

export default mongoose.model('User', UserSchema)
