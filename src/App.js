import { Route, Routes } from 'react-router-dom';
import RegistTtfSaving from './pages/saving/RegistTtfSaving';
import TestPage from './pages/accountBook/TestPage';
import LoginPage from './pages/accountBook/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      {/* 차례대로 대시보드, 입출금내역, 라이브러리 */}
      <Route path="/dashboard">
        <Route index element={<TestPage />} />
      </Route>
      <Route path="/transaction">
        <Route index element={<TestPage />} />  
      </Route>
      <Route path="/library">
        <Route index element={<TestPage />} />
      </Route>
      <Route path="/saving">
        <Route index element={<TestPage />} />
        <Route path="ttfregist" element={<RegistTtfSaving />} />
      </Route>
    </Routes>
  );
}

export default App;
