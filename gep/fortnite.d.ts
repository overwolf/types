declare namespace overwolf.gep.Fortnite {

    enum FortniteGeneric  {
        Knocked = 'knocked',
        Kill = 'kill',
        DoubleKill = '2kill',
        TripleKill = '3kill',
        MultiKill = 'mkill',
        Won = 'won',
        Death = 'death'
    }
    
    // --------------------------------------------------------------------------

    type FortniteInfoUpdates = {
        kill?: FortniteKill;
        mode?: FortniteMode;
        me?: FortniteMe;
        match_info?: FortniteMatchInfo;
        game_info?: FortniteGameInfo;
        death?: FortniteDeath;
    };

    /**
     * All available game events. When a new event is triggered, it's one of these
     * keys.
     */
    interface FortniteGameEvents extends overwolf.games.events.GameEventDictionary2 {
        kill?: number;
        knockout?: null;
        hit?: {isHeadshot?: true;};
        killed?: string;
        killer?: string;
        revived?: null;
        death?: null;
        knockedout?: string;
        matchStart?: null;
        matchEnd?: null;
        generic?: FortniteGeneric;
    }

    /**
     * The feature names available in Fortnite's GEP
     */
    type FortniteFeatures = keyof FortniteInfoUpdates;

    /**
     * Intended to be used with overwolf.games.events.onInfoUpdates2.addListener
     */
    type FortniteInfoUpdates2Event =
        overwolf.games.events.InfoUpdates2Event<FortniteFeatures, FortniteFeature>;

    /**
     * Intended to be used with overwolf.games.events.onNewEvent2.addListener
     */
    type FortniteGameEvent2Event =
        overwolf.games.events.GameEvent2<FortniteGameEvents>;
    }
}