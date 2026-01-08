import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function LoginPage({ action }){
  return <div className='mt-10'>
  { action === 'login' && <LoginForm /> }
  { action === 'register' && <RegisterForm />}
  </div>
}