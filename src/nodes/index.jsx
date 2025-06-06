import { TextNode } from './textNode';
import { InputNode } from './inputNode';
import { OutputNode } from './outputNode';
import { LLMNode } from './llmNode';
import { CounterNode } from './CounterNode';
import MathOperationNode from './MathOperationNode';
import { StringManipulationNode } from './StringManipulationNode';
import { DataFilterNode } from './DataFilterNode';
import { TimerNode } from './TimerNode';

export const nodeTypes = {
  textNode: TextNode,
  inputNode: InputNode,
  outputNode: OutputNode,
  llmNode: LLMNode,
  counterNode: CounterNode,
  mathOperationNode: MathOperationNode,
  stringManipulationNode: StringManipulationNode,
  dataFilterNode: DataFilterNode,
  timerNode: TimerNode,
}; 