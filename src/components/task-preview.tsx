import { TaskPreviewProps } from './types';

export const TaskPreview: React.FC<TaskPreviewProps> = () => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 p-8">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-normal">All Tasks</button>
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm font-normal">Calendar</button>
        </div>
        <div className="h-6 w-px bg-white/10"></div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm font-normal">Today</button>
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm font-normal">Week</button>
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm font-normal">Month</button>
        </div>
      </div>
      <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg text-sm font-normal">
        + Add Task
      </button>
    </div>

    <div className="grid grid-cols-3 gap-8">
      {[
        {
          title: "Due Today",
          color: "bg-red-500/10",
          textColor: "text-red-400",
          tasks: [
            {
              course: "CS 101",
              title: "Algorithm Analysis Assignment",
              time: "Due in 3 hours",
              progress: 80,
              subtasks: "4/5 completed"
            },
            {
              course: "MATH 201",
              title: "Linear Algebra Quiz",
              time: "Due in 5 hours",
              progress: 60,
              subtasks: "3/5 completed"
            }
          ]
        },
        {
          title: "Due Soon",
          color: "bg-blue-500/10",
          textColor: "text-blue-400",
          tasks: [
            {
              course: "PHYS 202",
              title: "Lab Report: Wave Motion",
              time: "Due tomorrow",
              progress: 40,
              subtasks: "2/6 completed"
            },
            {
              course: "ENG 301",
              title: "Research Paper Draft",
              time: "Due in 2 days",
              progress: 20,
              subtasks: "1/4 completed"
            }
          ]
        },
        {
          title: "Start Soon",
          color: "bg-gray-500/10",
          textColor: "text-gray-400",
          tasks: [
            {
              course: "BIO 301",
              title: "Genetics Project",
              time: "Due next week",
              progress: 0,
              subtasks: "0/5 planned"
            },
            {
              course: "CHEM 202",
              title: "Lab Experiment Report",
              time: "Due in 10 days",
              progress: 0,
              subtasks: "0/4 planned"
            }
          ]
        }
      ].map((column, i) => (
        <div key={i} className={`${column.color} rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`${column.textColor} font-light text-lg`}>{column.title}</h3>
            <span className="text-white/60 text-sm">{column.tasks.length} tasks</span>
          </div>
          <div className="space-y-4">
            {column.tasks.map((task, j) => (
              <div key={j} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white/60 text-sm mb-1">{task.course}</p>
                    <p className="text-white font-light">{task.title}</p>
                  </div>
                  <div className="bg-white/5 px-2 py-1 rounded text-sm text-white/60">
                    {task.time}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{task.subtasks}</span>
                    <span className="text-white/60">{task.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
