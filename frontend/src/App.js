import { Header } from './components/Header';
import { PipelineToolbar } from './components/toolbar';
import { PipelineUI } from './views/ui';


function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex flex-col flex-grow px-4 py-6">
        <PipelineToolbar />
        <PipelineUI />
      </main>

    </div>
  );
}

export default App;
