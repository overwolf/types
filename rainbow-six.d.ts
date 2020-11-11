declare namespace overwolf.gep.R6 {

    enum R6PTeam  {
        Orange = "Orange",
        Blue = "Blue"
    }

    enum R6Outcome  {
        Victory = "victory",
        Defeat = "defeat"
    }

    enum R6PGameMode  {
        None = "NONE",
        MultiplayerNewcomer = "MATCHMAKING_PVP_NEWCOMER",
        MultiplayerQuickMatch  = "MATCHMAKING_PVP",
        MultiplayerSpecialEvent = "MATCHMAKING_PVP_EVENT",
        MultiplayerArcadePlaylist = "MATCHMAKING_PVP_EVENT",
        MultiplayerRanked = "MATCHMAKING_PVP_UNRANKED",
        MultiplayerCustomGameLocal = "CUSTOMGAME_PVP",
        MultiplayerCustomGameOnline  = "CUSTOMGAME_PVP_DEDICATED",
        PlayerVsAISituations = "OPERATIONS",
        PlayerVsAITrainingGroundsLonewolf = "MATCHMAKING_PVE_LONEWOLF",
        PlayerVsAITrainingGroundsOnline = "MATCHMAKING_PVE_PARTY" 
    }
    
    enum R6Phase  {
        Lobby = "lobby",
        Teammates = "teammates",
        Announce = "announce",
        OperatorSelect = "operator_select",
        Loading = "loading",
        RoundResults = "round_results"     
    }


    interface R6Player {
        name?: string; 
        team?: string; 
        is_local?: boolean; 
        operator?: number; 
        kills?: number; 
        deaths?: number; 
        score?: number; 
        health?: number; 
    }

      // --------------------------------------------------------------------------

    /**
     * All available game info updates. When a new info update is triggered, it's one of these keys.
     */
    interface R6InfoUpdates extends overwolf.games.events.InfoUpdate2 {
        phase?: R6Phase;
        pseudo_match_id?: string;
        game_mode?: R6PGameMode;
        number?: number;
        score?: {blue?:number; orange?: number;}; //match feature
        players?: { roster_0?: R6Player; roster_1?: R6Player; roster_2?: R6Player; roster_3?: R6Player;  };
        team?: R6PTeam;
        health?: number;
        score?: number; //roster feature
        kills?: number;
        deaths?: number;
        operator?: string;
        name?: string;
        account_id?: string;
    }

    /**
     * All available game events. When a new event is triggered, it's one of these keys.
     */
    interface R6GameEvents extends overwolf.games.events.GameEventDictionary2 {
        roundStart?: null;
        roundEnd?: null;
        roundOutcome?: R6Outcome;
        matchOutcome?: R6Outcome;
        kill?: null;
        headshot?: null;
        knockedout?: null;
        death?: null;
        killer?: string;
 
    }

    // --------------------------------------------------------------------------

    /**
     * Intended to be used with overwolf.games.events.onInfoUpdates2.addListener
     */
    type R6GameEvent2info =
        overwolf.games.events.InfoUpdates2Event<R6InfoUpdates>;

    /**
     * Intended to be used with overwolf.games.events.onNewEvent2.addListener
     */
    type R6GameEvent2Event =
        overwolf.games.events.GameEvent2<R6GameEvents>;
    
}