import { BookOpen, FileText, GraduationCap, Users } from "lucide-react";
import "./Dashboard.css";

const courses = [
  { id: 1, title: "Introduction to React", progress: 75, instructor: "Sarah Johnson", students: 1234 },
  { id: 2, title: "Advanced JavaScript", progress: 45, instructor: "Mike Chen", students: 892 },
  { id: 3, title: "Web Design Fundamentals", progress: 90, instructor: "Emma Davis", students: 2156 },
  { id: 4, title: "Python for Beginners", progress: 30, instructor: "Alex Kumar", students: 3421 },
];

const recentActivity = [
  { action: "Completed", item: "React Hooks Module", time: "2 hours ago" },
  { action: "Started", item: "JavaScript Arrays Chapter", time: "5 hours ago" },
  { action: "Submitted", item: "Web Design Assignment #3", time: "1 day ago" },
];

const stats = [
  { label: "Enrolled Courses", value: 12, icon: BookOpen, color: "indigo" },
  { label: "Completed", value: 8, icon: FileText, color: "green" },
  { label: "Learning Hours", value: 48, icon: GraduationCap, color: "purple" },
  { label: "Certificates", value: 5, icon: Users, color: "orange" },
];

// eslint-disable-next-line no-unused-vars
const statCards = stats.map(({ label, value, icon: Icon, color }) => (
  <div key={label} className="stat-card">
    <div className="stat-card-content">
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
      <div className={`stat-icon stat-icon-${color}`}>
        <Icon />
      </div>
    </div>
  </div>
));

export const DashboardContent = ({ user }) => {
  console.log(user)
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-inner">
          <div>
            <h2>Welcome back, {user.name}!</h2>
            <p>Continue your learning journey</p>
          </div>
          <div className="user-info">
            <div className="user-text">
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </div>
            <img src={user.picture} alt={user.name} />
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="stats-grid">{statCards}</div>

        <div className="content-grid">
          <div className="courses">
            <h3>My Courses</h3>
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <div>
                    <h4>{course.title}</h4>
                    <p>by {course.instructor}</p>
                  </div>
                  <span>{course.students} students</span>
                </div>

                <div className="progress">
                  <div className="progress-text">
                    <span>Progress</span>
                    <span className="progress-value">{course.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <button className="primary-btn">Continue Learning</button>
              </div>
            ))}
          </div>

          <div className="activity">
            <h3>Recent Activity</h3>
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <FileText />
                </div>
                <div>
                  <p>
                    {activity.action}{" "}
                    <span className="highlight">{activity.item}</span>
                  </p>
                  <small>{activity.time}</small>
                </div>
              </div>
            ))}

            <button className="outline-btn">View All Activity</button>
          </div>
        </div>
      </main>
    </div>
  );
};
