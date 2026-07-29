export interface Member {
  id?: string;
  firstName: string;
  lastName: string;
  chapter: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Archived';
  birthday?: string;
  email?: string;
  phone?: string;
  dateJoined?: string;
}

export interface Activity {
  id?: string;
  title: string;
  date: string;
  type: string;
  description?: string;
  attendanceCount?: number;
}

export interface AttendanceRecord {
  id?: string;
  memberId: string;
  activityId: string;
  status: 'Present' | 'Absent' | 'Excused';
  timestamp: string;
}

export interface AppState {
  members: Member[];
  activities: Activity[];
  attendance: AttendanceRecord[];
  currentUser?: {
    uid: string;
    email: string;
    role: string;
  };
}
