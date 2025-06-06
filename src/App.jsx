import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import AnimatedBackground from './AnimatedBackground';
function App() {
  return (
    <div style={{ minHeight: '100vh', width: '100vw' }}>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <AnimatedBackground/>
    </div>
  );
}

export default App;
