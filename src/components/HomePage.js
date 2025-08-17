import styles from '../styles/HomePage.module.css';

export default function HomeContent() {
  const teamMembers = [
    {
      name: "Harman Puar",
      role: "List Manager",
      avatar: "/avatars/harman.jpg",
      contributions: [
        "Task CRUD operations",
        "Local storage integration"
      ]
    },
    {
      name: "Navdeep Singh",
      role: "Weather App",
      avatar: "/avatars/navdeep.jpg",
      contributions: [
        "WeatherAPI integration",
        "Error handling"
      ]
    },
    {
      name: "Jashandeep Singh",
      role: "Calculator",
      avatar: "/avatars/jashan.jpg",
      contributions: [
        "Arithmetic operations",
        "Calculation history"
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <h1>Multi-Function Web App</h1>
      <p className={styles.subtitle}>Choose an application from the Nevigation bar in the header of the web-page to use.</p>

      <div className={styles.teamSection}>
        <h2 classsName={styles.h2}>Development Team</h2>
        <div className={styles.profileGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.profileCard}>
              <div className={styles.avatarContainer}>
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className={styles.avatar}
                  onError={(e) => e.target.src = '/avatars/default.jpg'}
                />
              </div>
              <h3>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <ul className={styles.contributions}>
                {member.contributions.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}