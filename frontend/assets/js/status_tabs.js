/**
 * Handle table status tab selection
 */
function initStatusTabs() {
    // Find all tab containers
    const tabContainers = document.querySelectorAll('.selector');
    
    tabContainers.forEach(container => {
        // Get all tabs in this container
        const tabs = container.querySelectorAll('.tab, .tab-2, .tab_current');
        
        // Add click event to each tab
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabs.forEach(t => {
                    t.className = 'tab-2';
                    
                    // Update the text style class
                    const textElement = t.querySelector('div');
                    if (textElement) {
                        textElement.className = 'text-wrapper-10';
                    }
                });
                
                // Add active class to clicked tab
                this.className = 'tab';
                
                // Update the text style class
                const textElement = this.querySelector('div');
                if (textElement) {
                    textElement.className = 'text-white';
                }
            });
        });
    });
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initStatusTabs);
