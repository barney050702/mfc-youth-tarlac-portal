/**
 * MFC YOUTH TARLAC | STATE MANAGEMENT MODULE
 * Central Reactive State Store & Persistence Utilities
 */

export const SAMPLE_MEMBERS = [
    { id: 'm-img-01', name: 'Mark Allen S. Nosaves', age: 13, birthday: '3/23/2013', address: 'Matatalaib, Tarlac', contactNum: '9923937559', parentsContact: '9919235478' },
    { id: 'm-img-02', name: 'Precious Diane Z. Samson', age: 13, birthday: '3/20/2013', address: 'San Manuel, Tarlac', contactNum: '', parentsContact: '9919235478' },
    { id: 'm-img-03', name: 'Clark Kent Z. Samson', age: 10, birthday: '8/24/2016', address: 'San Manuel, Tarlac', contactNum: '9933643376', parentsContact: '9919235478' },
    { id: 'm-img-04', name: 'Cedrick Jewel G. Puyawan', age: 14, birthday: '9/12/2011', address: 'San Manuel, Tarlac', contactNum: '9455002513', parentsContact: '99546264287' },
    { id: 'm-img-05', name: 'Jhozhua L. Corpuz', age: 13, birthday: '12/29/2012', address: 'San Manuel, Tarlac', contactNum: '', parentsContact: '9108330947' },
    { id: 'm-img-06', name: 'Enzo Luis A. Labon', age: 14, birthday: '10/28/2011', address: 'San Manuel, Tarlac', contactNum: '', parentsContact: '' },
    { id: 'm-img-07', name: 'Jhaztin Carl Corpuz', age: 16, birthday: '2/28/2010', address: 'San Manuel, Tarlac', contactNum: '', parentsContact: '9108330973' },
    { id: 'm-img-08', name: 'John Marlon Sigua', age: 12, birthday: '9/8/2013', address: 'Maliwalo Tarlac', contactNum: '9122712254', parentsContact: '9456885921' },
    { id: 'm-img-09', name: 'Carmelo Anthony G. Sigua', age: 16, birthday: '9/28/2009', address: 'Maliwalo Tarlac', contactNum: '9153025737', parentsContact: '9456885921' },
    { id: 'm-img-10', name: 'Jovel D. Garcia', age: 14, birthday: '7/19/2011', address: 'Maliwalo Tarlac', contactNum: '90383601245', parentsContact: '9386956160' },
    { id: 'm-img-11', name: 'Jeanette Mary Salazar', age: 18, birthday: '9/8/2007', address: 'Sitio Buni Bura', contactNum: '9101368605', parentsContact: '9094708294' },
    { id: 'm-img-12', name: 'Jeonard Francis Catap', age: 18, birthday: '8/29/2007', address: 'Culipat, Tarlac City', contactNum: '9701807117', parentsContact: '9121256554' },
    { id: 'm-img-13', name: 'Miguel Antonio Tañedo', age: 18, birthday: '10/18/2011', address: 'San Sebastian, Tarlac City', contactNum: '9919791125', parentsContact: '9584867998' },
    { id: 'm-img-14', name: 'Gabriel R. Magat', age: 14, birthday: '1/16/2012', address: 'Sito Calevo Tibag, TarlacCity', contactNum: '9604136208', parentsContact: '9634409663' },
    { id: 'm-img-15', name: 'Rajh Bernardo', age: 14, birthday: '11/21/2014', address: 'Batang Batang Tarlac City', contactNum: '', parentsContact: '94821456916' },
    { id: 'm-img-16', name: 'Jaycee Antonio', age: 14, birthday: '11/23/2011', address: 'Batang Batang Tarlac City', contactNum: '9202031881', parentsContact: '9389293791' },
    { id: 'm-img-17', name: 'Aljune Lagmay', age: 16, birthday: '11/7/2012', address: 'Batang Batang Tarlac City', contactNum: '9564393473', parentsContact: '' },
    { id: 'm-img-18', name: 'Jillian Baquerto', age: 14, birthday: '5/5/2010', address: 'Lalapac Victoria Tarlac', contactNum: '', parentsContact: '965617117' },
    { id: 'm-img-19', name: 'Rocel Yusi', age: 15, birthday: '7/31/2011', address: 'Lalapac Victoria Tarlac', contactNum: '', parentsContact: '965617117' },
    { id: 'm-img-20', name: 'Justine A. Officiar', age: 15, birthday: '12/5/2010', address: 'Batang Batang Tarlac City', contactNum: '', parentsContact: '9092069693' }
];

export const state = (typeof window !== 'undefined' && window.state) ? window.state : {
    activities: [],
    members: [],
    attendance: {},
    funds: [],
    accounts: [],
    currentView: 'dashboard',
    selectedActivityId: null,
    searchQuery: '',
    filterCategory: 'ALL',
    filterStatus: 'ALL',
    agendaSemester: 'all',
    charts: {},
    agendaViewMode: 'grid',
    auditLog: [],
    currentRole: 'Super Admin',
    showOnlyDuplicates: false,
    sortOrder: 'ASC',
    charts: {} // Active Chart.js instances registry to prevent memory leaks
};
if (typeof window !== 'undefined' && !window.state) {
    window.state = state;
}

const listeners = new Set();

export function subscribeState(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

export function notifyStateChange(changeType = 'update') {
    state.lastUpdated = Date.now();
    saveToStorage();
    listeners.forEach(fn => fn(state, changeType));
}

export const SAMPLE_ACTIVITIES = [
    {
        id: 'act-sample-01',
        title: 'MFC Youth Provincial Assembly 2026',
        name: 'MFC Youth Provincial Assembly 2026',
        date: '2026-08-15',
        category: 'Assembly',
        type: 'Assembly',
        location: 'Tarlac Diocesan Center',
        venue: 'Tarlac Diocesan Center',
        status: 'Upcoming',
        description: 'Gathering of all youth members across Tarlac province for worship, teaching, and fellowship.',
        semester: 's2'
    },
    {
        id: 'act-sample-02',
        title: 'USBONG Youth Camp 2026',
        name: 'USBONG Youth Camp 2026',
        date: '2026-09-05',
        category: 'Youth Camp',
        type: 'Youth Camp',
        location: 'San Manuel Pastoral Center',
        venue: 'San Manuel Pastoral Center',
        status: 'Upcoming',
        description: '3-day flagship entry youth camp for new members and young leaders.',
        semester: 's2'
    },
    {
        id: 'act-sample-03',
        title: 'Servant Leaders Mentoring & Roster Assembly',
        name: 'Servant Leaders Mentoring & Roster Assembly',
        date: '2026-07-28',
        category: 'Servant Conference',
        type: 'Servant Conference',
        location: 'Victoria Youth Hub',
        venue: 'Victoria Youth Hub',
        status: 'Upcoming',
        description: 'Quarterly leadership alignment, pastoral formation, and household coordinator briefing.',
        semester: 's2'
    },
    {
        id: 'act-sample-04',
        title: 'Monthly Chapter Household Fellowship',
        name: 'Monthly Chapter Household Fellowship',
        date: '2026-08-01',
        category: 'Household',
        type: 'Household',
        location: 'Moncada Pastoral Center',
        venue: 'Moncada Pastoral Center',
        status: 'Upcoming',
        description: 'Monthly chapter household worship, sharing groups, and mentoring session.',
        semester: 's2'
    },
    {
        id: 'act-sample-05',
        title: 'CST Training Workshop (Christian Life Seminar)',
        name: 'CST Training Workshop (Christian Life Seminar)',
        date: '2026-06-20',
        category: 'CST Training',
        type: 'CST Training',
        location: 'Lapaz Community Center',
        venue: 'Lapaz Community Center',
        status: 'Completed',
        description: 'Training workshop for upcoming Youth Camp service team members and facilitators.',
        semester: 's1'
    },
    {
        id: 'act-sample-06',
        title: 'Sectorial Music & Worship Ministry Workshop',
        name: 'Sectorial Music & Worship Ministry Workshop',
        date: '2026-05-18',
        category: 'Sectorial Event',
        type: 'Sectorial Event',
        location: 'San Sebastian Cathedral Parish Hall',
        venue: 'San Sebastian Cathedral Parish Hall',
        status: 'Completed',
        description: 'Music team Jam session, sound engineering, and liturgical praise workshop.',
        semester: 's1'
    }
];

export function loadFromStorage() {
    try {
        const savedActivities = localStorage.getItem('ps_activities');
        const savedMembers = localStorage.getItem('ps_members');
        const savedAttendance = localStorage.getItem('ps_attendance');
        const savedFunds = localStorage.getItem('ps_funds');
        const savedAccounts = localStorage.getItem('ps_accounts');

        const parsedActs = savedActivities ? JSON.parse(savedActivities) : null;
        state.activities = (Array.isArray(parsedActs) && parsedActs.length > 0) ? parsedActs : [...SAMPLE_ACTIVITIES];
        if (!savedActivities || state.activities === SAMPLE_ACTIVITIES) {
            localStorage.setItem('ps_activities', JSON.stringify(state.activities));
        }

        state.members = savedMembers ? JSON.parse(savedMembers) : SAMPLE_MEMBERS;
        state.attendance = savedAttendance ? JSON.parse(savedAttendance) : {};
        state.funds = savedFunds ? JSON.parse(savedFunds) : [];
        state.accounts = savedAccounts ? JSON.parse(savedAccounts) : [];
    } catch (e) {
        console.warn('Failed to load local storage state:', e);
        state.activities = [...SAMPLE_ACTIVITIES];
    }
}

export function saveToStorage() {
    try {
        localStorage.setItem('ps_activities', JSON.stringify(state.activities));
        localStorage.setItem('ps_members', JSON.stringify(state.members));
        localStorage.setItem('ps_attendance', JSON.stringify(state.attendance));
        localStorage.setItem('ps_funds', JSON.stringify(state.funds));
        localStorage.setItem('ps_accounts', JSON.stringify(state.accounts));
    } catch (e) {
        console.warn('Failed to save state to storage:', e);
    }
}
