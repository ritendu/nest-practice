import * as bcrypt from 'bcrypt';


export const hashPassword = async(rawPassword)=>{
   
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(rawPassword, salt);
}


export const comparePassword = async (newPassword: string, oldPassword: string) => {
    return await bcrypt.compare(newPassword, oldPassword);
}