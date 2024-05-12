import { Dashboard } from '@/components/dashboard';
import { Login } from '@/components/login';
import { useLogin } from '@/hooks/useLogin';
import { useTaskGetQuery } from '@/hooks/useTaskGetQuery';

export const App = () => {
  const { session, onLoginClick } = useLogin();
  const tasks = useTaskGetQuery();

  console.log('tasks', tasks.data);

  if (!session)
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Login onClick={onLoginClick} />
      </div>
    );

  return <Dashboard />;
};
