import express from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

export const register = async (req: express.Request, res: express.Response) => {

    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            res.status(400).json("enter all details");
            return;
        }
      
        const hashPassword = async (password: string): Promise<string> => {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
          };
          const hashedPassword = await hashPassword(password)
     
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json(error)
    }
}

export const Login = async (req: express.Request, res: express.Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json("enter username and password")
        }
        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json("no user found");
            return;

        };

        const hashedPassword = user.password;
        const comparePassword = (password: string, hashedPassword: string): Promise<boolean> => {
            return bcrypt.compare(password, hashedPassword);
        };
       
        const passwordMatch = await comparePassword(password, hashedPassword);

        if (passwordMatch) {
            const { password, ...others } = user.toObject() as Document & {
              username: string;
              email: string;
              password: string;
            };
            res.status(200).json(others);
        }else{
            res.status(400).json("you enter wrong password")
        }
    } catch (error) {
        console.log(error)
    }
}