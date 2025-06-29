# Lab Rescheduling Management System  
Faculty of Engineering – University of Jaffna

## 📌 Project Overview
The Lab Rescheduling Management System is a web-based application designed to streamline lab schedule management, rescheduling requests, and notifications. It supports students, subject coordinators, and lab instructors in efficiently handling lab rescheduling workflows, attendance, and communication.

## 🎯 Objective
To reduce manual errors, delays, and communication gaps in lab rescheduling through a digital platform that offers request handling, approval workflows, automated email notifications, and real-time tracking of lab sessions.

## 🧑‍💻 User Roles
- **Student**: Submit reschedule requests and view status updates.
- **Subject Coordinator**: Approve or reject requests, manage lab schedules.
- **Lab Instructor**: Final approval and lab schedule adjustments.

## 🧱 Tech Stack
- **Frontend**: React.js, Next.js, HTML, CSS (Tailwind CSS)
- **Backend**: PHP
- **Database**: MySQL (`lab_rescheduling`)
- **Notifications**: EmailJS

## 🗃️ Database Tables (MySQL)
Database name: `lab_rescheduling`

| Table Name                        | Key Columns                                                                 |
|----------------------------------|------------------------------------------------------------------------------|
| `STUDENT`                        | `student_id`, `F_name`, `L_name`, `email`                                   |
| `SUBJECT_COORDINATOR`           | `coordinator_id`, `name`, `email`, `phone`                                  |
| `LAB_INSTRUCTOR`                | `Instructor_id`, `Name`, `E_mail`, `Phone`                                  |
| `LAB`                            | `Lab_id`, `Lab_name`, `Location`, `Availability`                            |
| `LAB_SCHEDULE`                   | `Schedule_id`, `Date`, `Time_Slot`, `Subject`, `Lab_id`, `coordinator_id`   |
| `RESCHEDULE_REQUEST`            | `Request_id`, `status`, `Reason`, `approval_letter`, `student_id`, `coordinator_id`, `Instructor_id` |
| `ATTENDANCE`                     | `attendance_id`, `student_id`, `Schedule_id`, `status`                       |
| `NOTIFICATION`                   | `notification_id`, `sent_at`, `message`, `recipient`                        |
| `STUDENT_RECEIVES_NOTIFICATION` | `student_id`, `notification_id`                                             |
| `COORDINATOR_RECEIVES_NOTIFICATION` | `coordinator_id`, `notification_id`                                    |

## 🔄 Workflow
1. **Student Request**: Students submit reschedule requests with faculty letters.
2. **Coordinator Review**: Reviews and forwards to instructor if approved.
3. **Instructor Confirmation**: Finalizes schedule changes.
4. **Notification**: Students and coordinators are emailed updates.
5. **Attendance**: Students attend labs and presence is recorded.

## 📬 Email Notification
- Integrated with **EmailJS** to notify users on request approval or rejection.

## 🔐 connection.php (Database Connector)
```php
<?php
$host = "localhost";
$user = "root"; // change as needed
$password = ""; // enter your password
$dbname = "lab_rescheduling";

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
````

## 📸 Key Interfaces

* **Student Dashboard**: Submit/view requests and notifications.
* **Coordinator Dashboard**: Approve/reject requests and manage lab schedules.
* **Instructor Console**: View approved requests and adjust schedules.

## 🚀 Features

* Digital rescheduling request system
* Automated approval workflow
* Real-time status tracking
* Email notifications (via EmailJS)
* Attendance and reschedule logs

## 🔗 Live Demo & Repository

🔗 [GitHub Repository](https://github.com/avidzcheetah/lab-rescheduling-sys)

## 📈 Future Enhancements

* AI-powered scheduling suggestions
* Predictive lab demand analytics
* Advanced conflict detection
* Mobile app version

## 📄 License

This project is developed as part of an academic submission for EC5070, Faculty of Engineering, University of Jaffna. Feel free to fork and contribute.

---

**Author**: WITHARANA A.D.S. – 2022/E/008

