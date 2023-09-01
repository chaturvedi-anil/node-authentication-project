import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name:
    {
        type: String,
        required : true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    }
}, {
    timestamps:true
});

// Define a method to hash the password before saving the user
userSchema.pre('save', async function (next) 
{
    const user = this;
    if (!user.isModified('password')) return next();
    try 
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } 
    catch (error) 
    {
        return next(error);
    }
});

// // Method to compare passwords
// userSchema.methods.comparePassword = function (candidatePassword, callback) 
// {
//     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => 
//     {
//         if (err) return callback(err);
//         callback(null, isMatch);
//     });
// };

const User = mongoose.model('User', userSchema);

export default User;