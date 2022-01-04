import { apiInitializer } from "discourse/lib/api";
import UserBadge from "discourse/models/user-badge";

export default apiInitializer("0.8", (api) => {

    //Get current username
    const currentUser = api.getCurrentUser();
    const username = currentUser.username;
    //If User is not logged-in then return, Else proceed    
    if (!currentUser) {
        return;
    }
    // Reopen the discourse-poll widget and override the _toggleOption method to grant the badge when User votes in the specified Poll.
    api.reopenWidget('discourse-poll', {
        _toggleOption(option) {
            this._super(option);
            debugger;
            const { attrs, state } = this;
            var selectedBadgeId = 107;
            var badgeReason = "Votes for a poll";
            return UserBadge.grant(selectedBadgeId, username, badgeReason).then(
                (newBadge) => {
                    debugger;
                  this.userBadges.pushObject(newBadge);
                  return newBadge;
                },
                (error) => {
                    debugger;
                  throw error;
                }
            );
        },
    });
});
