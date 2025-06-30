<?php
// CORS headers to allow cross-origin requests
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lab_rescheduling";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8
$conn->set_charset("utf8");

/**
 * Log request details for debugging.
 *
 * @param string $method HTTP method (GET, POST, etc.)
 * @param string $uri Request URI
 * @param array $headers Request headers
 * @param string $body Raw request body
 */
function logRequest($method, $uri, $headers, $body) {
    $logFile = __DIR__ . '/request.log';
    $logData = sprintf(
        "[%s] %s %s\nHeaders: %s\nBody: %s\n\n",
        date('Y-m-d H:i:s'),
        $method,
        $uri,
        json_encode($headers),
        $body
    );
    file_put_contents($logFile, $logData, FILE_APPEND);
}

// Log the current request
logRequest(
    $_SERVER['REQUEST_METHOD'],
    $_SERVER['REQUEST_URI'],
    function_exists('getallheaders') ? getallheaders() : [],
    file_get_contents('php://input')
);

// Function to get all reschedule requests
function getRescheduleRequests() {
    global $conn;
    
    $sql = "SELECT rr.*, s.F_name, s.L_name, s.email 
            FROM RESCHEDULE_REQUEST rr 
            JOIN STUDENT s ON rr.student_id = s.student_id 
            ORDER BY rr.created_at DESC";
    
    $result = $conn->query($sql);
    $requests = [];
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $requests[] = $row;
        }
    }
    
    return $requests;
}

// Function to create a new reschedule request
function createRescheduleRequest($data) {
    global $conn;
    
    // First, check if student exists, if not create
    $student_check = "SELECT student_id FROM STUDENT WHERE student_id = ?";
    $stmt = $conn->prepare($student_check);
    $stmt->bind_param("s", $data['studentId']);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 0) {
        // Create student record
        $student_sql = "INSERT INTO STUDENT (student_id, F_name, L_name, email) VALUES (?, ?, ?, ?)";
        $student_stmt = $conn->prepare($student_sql);
        $student_stmt->bind_param("ssss", $data['studentId'], $data['firstName'], $data['lastName'], $data['email']);
        $student_stmt->execute();
    }
    
    // Create reschedule request
    $sql = "INSERT INTO RESCHEDULE_REQUEST (status, created_at, Reason, Instructor_id, coordinator_id, student_id, lab_name) 
            VALUES ('pending', NOW(), ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $data['reason'], $data['instructorId'], $data['coordinatorId'], $data['studentId'],$data['labName']);
    
    if ($stmt->execute()) {
        return ["success" => true, "message" => "Request submitted successfully"];
    } else {
        return ["success" => false, "message" => "Error: " . $conn->error];
    }
}

// Function to update request status
function updateRequestStatus($requestId, $status) {
    global $conn;
    // Log the status update to the logfile
    $sql = "UPDATE RESCHEDULE_REQUEST SET status = ? WHERE Request_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $status, $requestId);
    
    if ($stmt->execute()) {
        return ["success" => true, "message" => "Status updated successfully"];
    } else {
        return ["success" => false, "message" => "Error: " . $conn->error];
    }
}

// Function to create lab schedule
function createLabSchedule($data) {
    global $conn;
    
    $sql = "INSERT INTO LAB_SCHEDULE (Date, Time_Slot, Subject, Lab_id, coordinator_id) 
            VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssis", $data['date'], $data['timeSlot'], $data['subject'], $data['labId'], $data['coordinatorId']);
    
    if ($stmt->execute()) {
        return ["success" => true, "message" => "Schedule created successfully", "id" => $conn->insert_id];
    } else {
        return ["success" => false, "message" => "Error: " . $conn->error];
    }
}

// Function to get lab schedules
function getLabSchedules() {
    global $conn;
    
    $sql = "SELECT ls.*, l.Lab_name, l.Location 
            FROM LAB_SCHEDULE ls 
            JOIN LAB l ON ls.Lab_id = l.Lab_id 
            ORDER BY ls.Date DESC, ls.Time_Slot ASC";
    
    $result = $conn->query($sql);
    $schedules = [];
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $schedules[] = $row;
        }
    }
    
    return $schedules;
}

// Function to send notification
function createNotification($message, $recipient) {
    global $conn;
    
    $sql = "INSERT INTO NOTIFICATION (sent_at, message, recipient) VALUES (NOW(), ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $message, $recipient);
    
    if ($stmt->execute()) {
        return $conn->insert_id;
    }
    return false;
}

// API endpoints handler
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['action'])) {
        switch ($input['action']) {
            case 'create_request':
                $response = createRescheduleRequest($input['data']);
                echo json_encode($response);
                break;
                
            case 'update_status':
                $response = updateRequestStatus($input['requestId'], $input['status']);
                echo json_encode($response);
                break;
                
            case 'create_schedule':
                $response = createLabSchedule($input['data']);
                echo json_encode($response);
                break;
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'get_requests':
                $requests = getRescheduleRequests();
                echo json_encode($requests);
                break;
                
            case 'get_schedules':
                $schedules = getLabSchedules();
                echo json_encode($schedules);
                break;
        }
    }
}

$conn->close();
?>