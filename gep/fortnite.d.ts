declare namespace overwolf.gep.Fortnite {

    enum FortniteGeneric {
        Knocked = 'knocked',
        Kill = 'kill',
        DoubleKill = '2kill',
        TripleKill = '3kill',
        MultiKill = 'mkill',
        Won = 'won',
        Death = 'death'
    }

    enum FortniteSelectedMaterial {
        Wood = 0,
        Stone = 1,
        Metal = 2
    }

    enum FortniteMode {
        Solo = "solo",
        Duo = "duo",
        Squad = "squad",
        TeamRumble = "Playlist_Respawn",
        Creative = "Playlist_PlaygroundV2",
        Playground = "Playlist_Creative_PlayOnly",
        ArenaSquads = "Playlist_ShowdownAlt_Solo",
        TheCombine = "Playlist_Crucible_Solo",
        BattleLab = "Playlist_BattleLab",
        Playlist_Creative_ZebraWallet_Random = "Playlist_Creative_ZebraWallet_Random",
        Playlist_Creative_ZebraWallet_Random2 = "Playlist_Creative_ZebraWallet_Random2",

    }

    enum FortnitePhase {
        Lobby = "lobby",
        LoadingScreen = "loading_screen",
        Airfield = "airfield",
        Aircraft = "aircraft",
        Freefly = "freefly"
    }

    enum FortniteRarity {
        None = 0,
        Green = 1,
        Blue = 2,
        Purple = 3,
        Gold = 4
    }

    interface FortniteTeamMember {
        player?: string;
    }

    interface FortniteInventoryItem {
        name?: string;
        count?: number;
        ammo?: number;
        rarity?: FortniteRarity;
    }

    interface FortniteQuickbarItem {
        name?: string;
    }

    // --------------------------------------------------------------------------

    /**
     * All available game info updates. When a new info update is triggered, it's one of these keys.
     */
    interface FortniteInfoUpdates extends overwolf.games.events.InfoUpdate2 {
        kills?: number;
        mode?: FortniteMode;
        pseudo_match_id?: string;
        sessionID?: string;
        matchID?: string;
        userID?: string;
        ticketID?: string;
        partyID?: string;
        rank?: number;
        total_teams?: number;
        total_players?: number;
        name?: string;
        health?: number;
        accuracy?: number;
        shield?: number;
        total_shots?: number;
        phase?: FortnitePhase;
        location?: { x?: number; y?: number; z?: number; };
        nicknames?: { team_members: FortniteTeamMember[]; };
        inventory?: { roster_0?: FortniteInventoryItem; roster_1?: FortniteInventoryItem; roster_2?: FortniteInventoryItem; roster_3?: FortniteInventoryItem; };
        selected_slot?: { isPrimary?: true; slot: number; };
        quickbar?: { quickbar_0?: FortniteQuickbarItem; quickbar_1?: FortniteQuickbarItem; quickbar_2?: FortniteQuickbarItem; quickbar_3?: FortniteQuickbarItem; };
        selected_material?: FortniteSelectedMaterial;
        ping?: number;
    }

    /**
     * All available game events. When a new event is triggered, it's one of these keys.
     */
    interface FortniteGameEvents extends overwolf.games.events.GameEventDictionary2 {
        kill?: number;
        knockout?: null;
        hit?: { isHeadshot?: true; };
        killed?: string;
        killer?: string;
        revived?: null;
        death?: null;
        knockedout?: string;
        matchStart?: null;
        matchEnd?: null;
        generic?: FortniteGeneric;
    }

    // --------------------------------------------------------------------------

    /**
     * Intended to be used with overwolf.games.events.onInfoUpdates2.addListener
     */
    type FortniteGameEvent2info =
        overwolf.games.events.InfoUpdates2Event<FortniteInfoUpdates>;

    /**
     * Intended to be used with overwolf.games.events.onNewEvent2.addListener
     */
    type FortniteGameEvent2Event =
        overwolf.games.events.GameEvent2<FortniteGameEvents>;

}