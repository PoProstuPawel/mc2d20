export const MC2D20 = {};

MC2D20.attributes = {
  "agi": "MC2D20.AbilityAgi",
  "awa": "MC2D20.AbilityAwa",
  "coo": "MC2D20.AbilityCoo",
  "int": "MC2D20.AbilityInt",
  "men": "MC2D20.AbilityMen",
  "per": "MC2D20.AbilityPer",
  "phy": "MC2D20.AbilityPhy",
  "str": "MC2D20.AbilityStr"  
};

MC2D20.abilityAbbreviations = {
  "agi": "MC2D20.AbilityAgiAbr",
  "awa": "MC2D20.AbilityAwaAbr",
  "coo": "MC2D20.AbilityCooAbr",
  "int": "MC2D20.AbilityIntAbr",
  "men": "MC2D20.AbilityMenAbr",
  "per": "MC2D20.AbilityPerAbr",
  "phy": "MC2D20.AbilityPhyAbr",
  "str": "MC2D20.AbilityStrAbr",
};

MC2D20.SKILLS = [
  {
    'label': 'ACROBATICS',
    'key': "Acrobatics",
    'focuses': ['Acrobatics']
  },
  {
    'label': 'CLOSE COMBAT',
    'key': "Close Combat",
    'focuses': ['Close Combat']
  },
  {
    'label': 'UNARMED COMBAT',
    'key': "Unarmed Combat",
    'focuses': ['Unarmed Combat']
  },
  {
    'label': 'OBSERVATION',
    'key': "Observation",
    'focuses': ['Observation']
  },
  {
    'label': 'INSIGHT',
    'key': "Insight",
    'focuses': ['Insight']
  },
  {
    'label': 'THIEVERY',
    'key': "Thievery",
    'focuses': ['Thievery']
  },
  {
    'label': 'RANGED WEAPONS',
    'key': "Ranged Weapons",
    'focuses': ['Ranged Weapons']
  },
  {
    'label': 'GUNNERY',
    'key': "Gunnery",
    'focuses': ['Gunnery']
  },
  {
    'label': 'PILOT',
    'key': "Pilot",
    'focuses': ['Pilot']
  },
  {
    'label': 'SPACE',
    'key': "Space",
    'focuses': ['Space']
  },
  {
    'label': 'EDUCATION',
    'key': "Education",
    'focuses': ['Education']
  },
  {
    'label': 'LINGUISTICS',
    'key': "Linguistics",
    'focuses': ['Linguistics']
  },
  {
    'label': 'SCIENCE',
    'key': "Science",
    'focuses': ['Science']
  },
  {
    'label': 'MECHANICS',
    'key': "Mechanics",
    'focuses': ['Mechanics']
  },
  {
    'label': 'SURVIVAL',
    'key': "Survival",
    'focuses': ['Survival']
  },
  {
    'label': 'VACUUM',
    'key': "Vacuum",
    'focuses': ['Vacuum']
  },
  {
    'label': 'TREATMENT',
    'key': "Treatment",
    'focuses': ['Treatment']
  },
  {
    'label': 'THIEVERY',
    'key': "Thievery",
    'focuses': ['Thievery']
  },
  {
    'label': 'MEDICINE',
    'key': "Medicine",
    'focuses': ['Medicine']
  },
  {
    'label': 'PSYCHOTHERAPY',
    'key': "Psychotherapy",
    'focuses': ['Psychotherapy']
  },
  {
    'label': 'WILLPOWER',
    'key': "Willpower",
    'focuses': ['Willpower']
  },
  {
    'label': 'MYSTICISM',
    'key': "Mysticism",
    'focuses': ['Mysticism']
  },
  {
    'label': 'ANIMAL HANDLING',
    'key': "Animal Handling",
    'focuses': ['Animal Handling']
  },
  {
    'label': 'LIFESTYLE',
    'key': "Lifestyle",
    'focuses': ['Lifestyle']
  },
  {
    'label': 'PERSUADE',
    'key': "Persuade",
    'focuses': ['Persuade']
  },
  {
    'label': 'COMMAND',
    'key': "Command",
    'focuses': ['Command']
  },
  {
    'label': 'RESISTANCE',
    'key': "Resistance",
    'focuses': ['Resistance']
  },
  {
    'label': 'ATHLETICS',
    'key': "Athletics",
    'focuses': ['Athletics']
  }
];

MC2D20.Size = ["Trivial", "Minor", "Major"];

MC2D20.WEAPONS = {
  "range": {
    "reach": "MC2D20.RANGE.reach",
    "close": "MC2D20.RANGE.close",
    "medium": "MC2D20.RANGE.medium",
    "long": "MC2D20.RANGE.long",
    "extreme": "MC2D20.RANGE.extreme"
  },
  "weaponTypes": [{
    'label': "Melee",
    'bonusAttribute': 'agi'
  },
  {
    'label': "Ranged",
    'bonusAttribute': 'coo'
  },
  {
    'label': "Mental",
    'bonusAttribute': 'wil'
  }]
}



