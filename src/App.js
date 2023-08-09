import { Route, Routes } from 'react-router-dom';
import RegistTtfSaving from './pages/saving/RegistTtfSaving';
import LoginPage from './pages/accountBook/LoginPage';
import RegistFormPage from './pages/saving/RegistFormPage';
import RegistCompletePage from './pages/saving/RegistCompletePage';
import TTFScriptPage from './pages/saving/TTFScriptPage';
import LibraryJM from './pages/library/Library';
import Dashboard from './pages/accountBook/Dashboard';
import SavingsListPage from './pages/saving/SavingsListPage';

function App() {
  return (
    <Routes>
      <Route path="" element={<LoginPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      {/* 차례대로 대시보드, 입출금내역, 라이브러리 */}
      <Route path="/dashboard">
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/library">
        <Route index element={<LibraryJM />} />
      </Route>
      <Route path="/saving">
        <Route path="scriptttf" element={< TTFScriptPage/>} />
        <Route path="ttfregist" element={<RegistTtfSaving />} />
        <Route path="writeform" element={<RegistFormPage />} />
        <Route path="registcomplete" element={<RegistCompletePage />} />
        <Route index element={<SavingsListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
