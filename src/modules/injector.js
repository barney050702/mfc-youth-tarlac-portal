// Modals
import addMemberHtml from '../components/modals/add-member.html?raw';
import letterGeneratorHtml from '../components/modals/letter-generator.html?raw';
import rosaryInteractiveHtml from '../components/modals/rosary-interactive.html?raw';
import venueMapHtml from '../components/modals/venue-map.html?raw';
import modalHtml from '../components/modals/modal.html?raw';

// Views
import resourcesHtml from '../components/views/resources.html?raw';
import dashboardHtml from '../components/views/dashboard.html?raw';
import attendanceHtml from '../components/views/attendance.html?raw';
import fundsHtml from '../components/views/funds.html?raw';
import membersHtml from '../components/views/members.html?raw';
import analyticsHtml from '../components/views/analytics.html?raw';
import activitiesHtml from '../components/views/activities.html?raw';
import accountHtml from '../components/views/account.html?raw';
import agendaHtml from '../components/views/agenda.html?raw';

export function injectComponents() {
    const components = [
        { id: 'add-member-backdrop-container', html: addMemberHtml },
        { id: 'letter-generator-backdrop-container', html: letterGeneratorHtml },
        { id: 'rosary-interactive-backdrop-container', html: rosaryInteractiveHtml },
        { id: 'venue-map-modal-backdrop-container', html: venueMapHtml },
        { id: 'modal-backdrop-container', html: modalHtml },
        { id: 'view-resources-container', html: resourcesHtml },
        { id: 'view-dashboard-container', html: dashboardHtml },
        { id: 'view-attendance-container', html: attendanceHtml },
        { id: 'view-funds-container', html: fundsHtml },
        { id: 'view-members-container', html: membersHtml },
        { id: 'view-analytics-container', html: analyticsHtml },
        { id: 'view-activities-container', html: activitiesHtml },
        { id: 'view-account-container', html: accountHtml },
        { id: 'view-agenda-container', html: agendaHtml },
    ];

    components.forEach(({ id, html }) => {
        const container = document.getElementById(id);
        if (container) {
            container.outerHTML = html;
        } else {
            console.warn(`Could not find container for injection: ${id}`);
        }
    });
}
