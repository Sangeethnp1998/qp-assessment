import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) =>{
    try {
        return await bcrypt.hash(password, 10)
    } catch (error) {
        console.error(error);
        return ;
    }
}

export const comparePassword = async (password: string,hashedPassword:string) =>{
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
        console.error(error);
        return ;
    }
}
