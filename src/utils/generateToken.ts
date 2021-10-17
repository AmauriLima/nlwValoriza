import jwt from 'jsonwebtoken';

interface IGenerateTokenParams {
  email: string,
  id: string,
}

export function generateToken({ email, id }: IGenerateTokenParams): string {
  return jwt.sign({ email }, '139334c4423daf8485c1d9d2bc93ae169592a304', {
    subject: id,
    expiresIn: '1d',
  });
}
