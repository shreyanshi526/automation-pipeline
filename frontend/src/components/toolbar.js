import { DraggableNode } from './draggableNode';
import { FaUserEdit, FaCog, FaCalendarAlt, FaSignOutAlt, FaFont, FaRandom, FaCheckCircle, FaCogs, FaCloud, FaCodeBranch } from 'react-icons/fa';



export const PipelineToolbar = () => {
    return (
        <div className='bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 border-b border-gray-200 shadow-sm'>
            <div className='flex items-center justify-between gap-4 px-6 py-6'>
                {/* Header Section */}
                <div className='flex-shrink-0'>
                    <h2 className='text-xl font-bold text-gray-800 mb-1'>
                        Toolbar Section
                    </h2>
                    <p className='text-sm text-gray-600'>
                        Drag and drop nodes to create your workflow
                    </p>
                </div>

                {/* Nodes Section */}
                <div className='flex flex-wrap gap-3'>
                    <DraggableNode
                        type='text'
                        label='Text'
                        className={'from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 border-blue-400'}
                        icon={<FaFont size={16} className="text-white/90" />}
                    />
                    <DraggableNode
                        type='transformerNode'
                        label='Transformer'
                        className={'from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 border-purple-400'}
                        icon={<FaRandom size={16} className="text-white/90" />}
                    />
                    <DraggableNode
                        type='validatorNode'
                        label='Validator'
                        className={'from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 border-green-400'}
                        icon={<FaCheckCircle size={16} className="text-white/90" />}
                    />
                    <DraggableNode
                        type='textProcessor'
                        label="Text Processor"
                        className={'from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 border-amber-400'}
                        icon={<FaCogs size={16} className="text-white/90" />}
                    />
                    <DraggableNode
                        type='apiCall'
                        label="API Call"
                        className={'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border-cyan-400'}
                        icon={<FaCloud size={16} className="text-white/90" />}
                    />
                    <DraggableNode
                        type='condition'
                        label='Condition'
                        className={'from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 border-teal-400'}
                        icon={<FaCodeBranch size={16} className="text-white/90" />}
                    />
                    <DraggableNode
                        type='fileUpload'
                        label='File Upload'
                        className={'from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500 border-gray-400'}
                        icon={<FaSignOutAlt size={16} className="text-white/90" />}
                    />
                    <DraggableNode
                        type="userForm"
                        label="User Form"
                        className="from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 border-red-500"
                        icon={<FaUserEdit size={16} className="text-white/90" />}
                    />
                    <DraggableNode
                        type="dataProcessor"
                        label="Data Processor"
                        className="from-pink-400 to-pink-600 hover:from-pink-300 hover:to-pink-500 border-pink-400"
                        icon={<FaCog size={16} className="text-white/90" />}
                    />
                    <DraggableNode
                        type="scheduler"
                        label="Scheduler"
                        className="from-purple-300 to-purple-500 hover:from-purple-200 hover:to-purple-400 border-purple-400"
                        icon={<FaCalendarAlt size={16} className="text-white/90" />}
                    />
                </div>
            </div>
        </div>
    );
};