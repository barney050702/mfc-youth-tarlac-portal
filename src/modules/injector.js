// Modals
import addMemberHtml from '../components/modals/add-member.js';
import letterGeneratorHtml from '../components/modals/letter-generator.js';
import rosaryInteractiveHtml from '../components/modals/rosary-interactive.js';
import venueMapHtml from '../components/modals/venue-map.js';
import modalHtml from '../components/modals/modal.js';

// Views
import resourcesHtml from '../components/views/resources.js';
import dashboardHtml from '../components/views/dashboard.js';
import attendanceHtml from '../components/views/attendance.js';
import fundsHtml from '../components/views/funds.js';
import membersHtml from '../components/views/members.js';
import analyticsHtml from '../components/views/analytics.js';
import activitiesHtml from '../components/views/activities.js';
import accountHtml from '../components/views/account.js';
import agendaHtml from '../components/views/agenda.js';

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
