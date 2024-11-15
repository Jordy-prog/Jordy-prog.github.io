import os


ROOT = 'static/images/'


def generateModalHeader(modal_id, title):
    return f'''<div id="{modal_id}" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <span class="modal-title">{title}</span>
            <img class="close-modal-btn" data-close="{modal_id}" height="50" src="/static/images/close_button.png">
        </div>\n'''

def generateModalClose():
    return '''\t</div>
</div>\n'''

def generateRelicModalItems(folders, container_id):
    image_paths = []

    for folder in folders:
        image_paths.extend(map(lambda image: '/' + folder + image, os.listdir(folder)))

    image_paths.sort(key=lambda x: x.split('/')[-1])

    info = list(map(lambda x: (x.split('/')[-1].replace('.png', '').replace('_', ' ').title(), x), image_paths))

    result = '''\t\t<div class="modal-body item-grid">\n'''

    for name, imagePath in info:
        elementId = container_id + '_' + imagePath.split('/')[-1].replace('.png', '')

        result += f'''\t\t\t<div id="{elementId}" class="item" data-copy-target="{container_id}">
                <img class="item-image" src="{imagePath}">
                <div class="item-footer">
                    <img class="item-checkbox" src="/static/images/tickbox_unticked.png">
                    <span class="item-label">{name}</span>
                </div>
            </div>\n'''

    result += '''\t\t</div>\n'''

    return result

def generateCardModalItems(folders, container_id, upgrade=True, addStarters=False):
    TIMES2 = [
        'Clumsy', 
        'Regret', 
        'Parasite', 
        'Injury', 
        'Block Potion', 
        'Weak Potion', 
        'Flex Potion', 
        'Swift Potion', 
        'Vulnerable Potion', 
        'Fire Potion', 
        'Explosive Potion', 
        'Energy Potion', 
        ]

    image_paths = []

    for folder in folders:
        image_paths.extend(map(lambda image: '/' + folder + image, os.listdir(folder)))

    info = list(map(lambda x: (x.split('/')[-1].replace('.png', '').replace('_', ' ').title(), x), image_paths))

    result = '''\t\t<ul class="modal-body card-list">'''

    if addStarters:
        if 'Ironclad' in container_id:
            result += getIroncladStarters()
        elif 'Silent' in container_id:
            result += getSilentStarters()
        elif 'Defect' in container_id:
            result += getDefectStarters()
        else:
            result += getWatcherStarters()
    else:
        result += '''\n\t'''

    for name, imagePath in info:
        amount = 2 if ('/common/' in imagePath or name in TIMES2) else 1
        rarity = imagePath.split('/')[-2] + '-card'

        for i in range(amount):
            elementId = container_id + '_' + imagePath.split('/')[-1].replace('.png', '') + str(i)

            element = f'''\t\t<li id="{elementId}" class="card-list-item {rarity}" data-copy-target="{container_id}">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">'''

            if upgrade:
                element += '''\n\t\t\t\t<img class="card-upgrade" src="/static/images/upgrade.png">'''

            element += f'''
                <span class="card-label">{name}</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="{imagePath}">
            </li>\n\t'''

            result += element
        
    result += '''\t</ul>\n'''

    return result

def getIroncladStarters():
    return '''
            <li id="deckContainerIronclad_defend0" class="card-list-item common-card" data-copy-target="deckContainerIronclad">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/ironclad/starter/defend.png">
            </li>
            <li id="deckContainerIronclad_defend1" class="card-list-item common-card" data-copy-target="deckContainerIronclad">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/ironclad/starter/defend.png">
            </li>
            <li id="deckContainerIronclad_defend2" class="card-list-item common-card" data-copy-target="deckContainerIronclad">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/ironclad/starter/defend.png">
            </li>
            <li id="deckContainerIronclad_defend3" class="card-list-item common-card" data-copy-target="deckContainerIronclad">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/ironclad/starter/defend.png">
            </li>
            <li id="deckContainerIronclad_strike0" class="card-list-item common-card" data-copy-target="deckContainerIronclad">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/ironclad/starter/strike.png">
            </li>
            <li id="deckContainerIronclad_strike1" class="card-list-item common-card" data-copy-target="deckContainerIronclad">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/ironclad/starter/strike.png">
            </li>
            <li id="deckContainerIronclad_strike2" class="card-list-item common-card" data-copy-target="deckContainerIronclad">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/ironclad/starter/strike.png">
            </li>
            <li id="deckContainerIronclad_strike3" class="card-list-item common-card" data-copy-target="deckContainerIronclad">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/ironclad/starter/strike.png">
            </li>
            <li id="deckContainerIronclad_strike4" class="card-list-item common-card" data-copy-target="deckContainerIronclad">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/ironclad/starter/strike.png">
            </li>
            <li id="deckContainerIronclad_bash0" class="card-list-item common-card" data-copy-target="deckContainerIronclad">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Bash</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/ironclad/starter/bash.png">
            </li>
    '''

def getSilentStarters():
    return '''
            <li id="deckContainerSilent_defend0" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/defend.png">
            </li>
            <li id="deckContainerSilent_defend1" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/defend.png">
            </li>
            <li id="deckContainerSilent_defend2" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/defend.png">
            </li>
            <li id="deckContainerSilent_defend3" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/defend.png">
            </li>
            <li id="deckContainerSilent_defend4" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/defend.png">
            </li>
            <li id="deckContainerSilent_strike0" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/strike.png">
            </li>
            <li id="deckContainerSilent_strike1" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/strike.png">
            </li>
            <li id="deckContainerSilent_strike2" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/strike.png">
            </li>
            <li id="deckContainerSilent_strike3" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/strike.png">
            </li>
            <li id="deckContainerSilent_strike4" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/strike.png">
            </li>
            <li id="deckContainerSilent_neutralize0" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Neutralize</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/neutralize.png">
            </li>
            <li id="deckContainerSilent_survivor0" class="card-list-item common-card" data-copy-target="deckContainerSilent">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Survivor</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/silent/starter/survivor.png">
            </li>
    '''

def getDefectStarters():
    return '''
            <li id="deckContainerDefect_defend0" class="card-list-item common-card" data-copy-target="deckContainerDefect">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/defect/starter/defend.png">
            </li>
            <li id="deckContainerDefect_defend1" class="card-list-item common-card" data-copy-target="deckContainerDefect">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/defect/starter/defend.png">
            </li>
            <li id="deckContainerDefect_defend2" class="card-list-item common-card" data-copy-target="deckContainerDefect">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/defect/starter/defend.png">
            </li>
            <li id="deckContainerDefect_defend3" class="card-list-item common-card" data-copy-target="deckContainerDefect">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/defect/starter/defend.png">
            </li>
            <li id="deckContainerDefect_strike0" class="card-list-item common-card" data-copy-target="deckContainerDefect">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/defect/starter/strike.png">
            </li>
            <li id="deckContainerDefect_strike1" class="card-list-item common-card" data-copy-target="deckContainerDefect">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/defect/starter/strike.png">
            </li>
            <li id="deckContainerDefect_strike2" class="card-list-item common-card" data-copy-target="deckContainerDefect">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/defect/starter/strike.png">
            </li>
            <li id="deckContainerDefect_strike3" class="card-list-item common-card" data-copy-target="deckContainerDefect">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/defect/starter/strike.png">
            </li>
            <li id="deckContainerDefect_dualcast0" class="card-list-item common-card" data-copy-target="deckContainerDefect">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Dualcast</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/defect/starter/dualcast.png">
            </li>
            <li id="deckContainerDefect_zap0" class="card-list-item common-card" data-copy-target="deckContainerDefect">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Zap</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/defect/starter/zap.png">
            </li>
    '''

def getWatcherStarters():
    return '''
            <li id="deckContainerWatcher_defend0" class="card-list-item common-card" data-copy-target="deckContainerWatcher">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/watcher/starter/defend.png">
            </li>
            <li id="deckContainerWatcher_defend1" class="card-list-item common-card" data-copy-target="deckContainerWatcher">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/watcher/starter/defend.png">
            </li>
            <li id="deckContainerWatcher_defend2" class="card-list-item common-card" data-copy-target="deckContainerWatcher">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/watcher/starter/defend.png">
            </li>
            <li id="deckContainerWatcher_defend3" class="card-list-item common-card" data-copy-target="deckContainerWatcher">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Defend</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/watcher/starter/defend.png">
            </li>
            <li id="deckContainerWatcher_strike0" class="card-list-item common-card" data-copy-target="deckContainerWatcher">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/watcher/starter/strike.png">
            </li>
            <li id="deckContainerWatcher_strike1" class="card-list-item common-card" data-copy-target="deckContainerWatcher">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/watcher/starter/strike.png">
            </li>
            <li id="deckContainerWatcher_strike2" class="card-list-item common-card" data-copy-target="deckContainerWatcher">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/watcher/starter/strike.png">
            </li>
            <li id="deckContainerWatcher_strike3" class="card-list-item common-card" data-copy-target="deckContainerWatcher">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Strike</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/watcher/starter/strike.png">
            </li>
            <li id="deckContainerWatcher_eruption0" class="card-list-item common-card" data-copy-target="deckContainerWatcher">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Eruption</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/watcher/starter/eruption.png">
            </li>
            <li id="deckContainerWatcher_vigilance0" class="card-list-item common-card" data-copy-target="deckContainerWatcher">
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <img class="card-upgrade" src="/static/images/upgrade.png">
                <span class="card-label">Vigilance</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/watcher/starter/vigilance.png">
            </li>
    '''

def createGeneralModals():
    allModals = ''

    # Define Modals
    relicModal = generateModalHeader('skippedRelicsModal', 'Skipped Relics')
    relicModal += generateRelicModalItems([ROOT + 'relics/'], 'skippedRelicsContainer')
    relicModal += generateModalClose()

    bossRelicModal = generateModalHeader('skippedBossRelicsModal', 'Skipped Boss Relics')
    bossRelicModal += generateRelicModalItems([ROOT + 'boss_relics/'], 'skippedBossRelicsContainer')
    bossRelicModal += generateModalClose()

    potionModal = generateModalHeader('skippedPotionsModal', 'Skipped Potions')
    potionModal += generateCardModalItems([ROOT + 'potions/'], 'skippedPotionsContainer', False)
    potionModal += generateModalClose()

    curseModal = generateModalHeader('skippedCursesModal', 'Skipped Curses')
    curseModal += generateCardModalItems([ROOT + 'cards/curses/'], 'skippedCursesContainer', False)
    curseModal += generateModalClose()

    colorlessModal = generateModalHeader('skippedColorlessModal', 'Skipped Colorless Cards')
    colorlessModal += generateCardModalItems([ROOT + 'cards/colorless/'], 'skippedColorlessContainer')
    colorlessModal += generateModalClose()

    # Add modals
    allModals += relicModal
    allModals += bossRelicModal
    allModals += potionModal
    allModals += curseModal
    allModals += colorlessModal

    # Write
    with open('templates/generalModals_template.html', 'w') as fo:
        fo.write(allModals)

def createIroncladModals():
    allModals = ''

    # Define Modals
    relicModal = generateModalHeader('relicsModalIronclad', 'Relics')
    relicModal += generateRelicModalItems([ROOT + 'relics/'], 'relicsContainerIronclad')
    relicModal += generateModalClose()

    bossRelicModal = generateModalHeader('bossRelicsModalIronclad', 'Boss Relics')
    bossRelicModal += generateRelicModalItems([ROOT + 'boss_relics/'], 'bossRelicsContainerIronclad')
    bossRelicModal += generateModalClose()

    potionModal = generateModalHeader('potionsModalIronclad', 'Potions')
    potionModal += generateCardModalItems([ROOT + 'potions/'], 'potionsContainerIronclad', False)
    potionModal += generateModalClose()

    deckModal = generateModalHeader('deckModalIronclad', 'Deck')
    deckModal += generateCardModalItems([ROOT + 'cards/ironclad/common/', 
                                        ROOT + 'cards/ironclad/uncommon/',
                                        ROOT + 'cards/colorless/',
                                        ROOT + 'cards/curses/'
                                        ], 
                                        'deckContainerIronclad', addStarters=True)
    deckModal += generateModalClose()

    rareDeckModal = generateModalHeader('rareDeckModalIronclad', 'Rare Deck')
    rareDeckModal += generateCardModalItems([ROOT + 'cards/ironclad/rare/'], 'rareDeckContainerIronclad')
    rareDeckModal += generateModalClose()

    removedModal = generateModalHeader('removedCardsModalIronclad', 'Removed Cards')
    removedModal += generateCardModalItems([ROOT + 'cards/ironclad/common/', 
                                            ROOT + 'cards/ironclad/uncommon/',
                                            ROOT + 'cards/ironclad/rare/',
                                            ROOT + 'cards/colorless/',
                                            ROOT + 'cards/curses/'
                                            ], 
                                            'removedCardsContainerIronclad', addStarters=True)
    removedModal += generateModalClose()

    skippedRaresModal = generateModalHeader('skippedRaresModalIronclad', 'Skipped Rares')
    skippedRaresModal += generateCardModalItems([ROOT + 'cards/ironclad/rare/'], 'skippedRaresContainerIronclad')
    skippedRaresModal += generateModalClose()

    # Add modals
    allModals += relicModal
    allModals += bossRelicModal
    allModals += potionModal
    allModals += deckModal
    allModals += rareDeckModal
    allModals += removedModal
    allModals += skippedRaresModal

    # Write
    with open('templates/ironcladModals_template.html', 'w') as fo:
        fo.write(allModals)

def createSilentModals():
    allModals = ''

    # Define Modals
    relicModal = generateModalHeader('relicsModalSilent', 'Relics')
    relicModal += generateRelicModalItems([ROOT + 'relics/'], 'relicsContainerSilent')
    relicModal += generateModalClose()

    bossRelicModal = generateModalHeader('bossRelicsModalSilent', 'Boss Relics')
    bossRelicModal += generateRelicModalItems([ROOT + 'boss_relics/'], 'bossRelicsContainerSilent')
    bossRelicModal += generateModalClose()

    potionModal = generateModalHeader('potionsModalSilent', 'Potions')
    potionModal += generateCardModalItems([ROOT + 'potions/'], 'potionsContainerSilent', False)
    potionModal += generateModalClose()

    deckModal = generateModalHeader('deckModalSilent', 'Deck')
    deckModal += generateCardModalItems([ROOT + 'cards/silent/common/', 
                                        ROOT + 'cards/silent/uncommon/',
                                        ROOT + 'cards/colorless/',
                                        ROOT + 'cards/curses/'
                                        ], 
                                        'deckContainerSilent', addStarters=True)
    deckModal += generateModalClose()

    rareDeckModal = generateModalHeader('rareDeckModalSilent', 'Rare Deck')
    rareDeckModal += generateCardModalItems([ROOT + 'cards/silent/rare/'], 'rareDeckContainerSilent')
    rareDeckModal += generateModalClose()

    removedModal = generateModalHeader('removedCardsModalSilent', 'Removed Cards')
    removedModal += generateCardModalItems([ROOT + 'cards/silent/common/', 
                                            ROOT + 'cards/silent/uncommon/',
                                            ROOT + 'cards/silent/rare/',
                                            ROOT + 'cards/colorless/',
                                            ROOT + 'cards/curses/'
                                            ], 
                                            'removedCardsContainerSilent', addStarters=True)
    removedModal += generateModalClose()

    skippedRaresModal = generateModalHeader('skippedRaresModalSilent', 'Skipped Rares')
    skippedRaresModal += generateCardModalItems([ROOT + 'cards/silent/rare/'], 'skippedRaresContainerSilent')
    skippedRaresModal += generateModalClose()

    # Add modals
    allModals += relicModal
    allModals += bossRelicModal
    allModals += potionModal
    allModals += deckModal
    allModals += rareDeckModal
    allModals += removedModal
    allModals += skippedRaresModal

    # Write
    with open('templates/silentModals_template.html', 'w') as fo:
        fo.write(allModals)

def createDefectModals():
    allModals = ''

    # Define Modals
    relicModal = generateModalHeader('relicsModalDefect', 'Relics')
    relicModal += generateRelicModalItems([ROOT + 'relics/'], 'relicsContainerDefect')
    relicModal += generateModalClose()

    bossRelicModal = generateModalHeader('bossRelicsModalDefect', 'Boss Relics')
    bossRelicModal += generateRelicModalItems([ROOT + 'boss_relics/'], 'bossRelicsContainerDefect')
    bossRelicModal += generateModalClose()

    potionModal = generateModalHeader('potionsModalDefect', 'Potions')
    potionModal += generateCardModalItems([ROOT + 'potions/'], 'potionsContainerDefect', False)
    potionModal += generateModalClose()

    deckModal = generateModalHeader('deckModalDefect', 'Deck')
    deckModal += generateCardModalItems([ROOT + 'cards/defect/common/', 
                                        ROOT + 'cards/defect/uncommon/',
                                        ROOT + 'cards/colorless/',
                                        ROOT + 'cards/curses/'
                                        ], 
                                        'deckContainerDefect', addStarters=True)
    deckModal += generateModalClose()

    rareDeckModal = generateModalHeader('rareDeckModalDefect', 'Rare Deck')
    rareDeckModal += generateCardModalItems([ROOT + 'cards/defect/rare/'], 'rareDeckContainerDefect')
    rareDeckModal += generateModalClose()

    removedModal = generateModalHeader('removedCardsModalDefect', 'Removed Cards')
    removedModal += generateCardModalItems([ROOT + 'cards/defect/common/', 
                                            ROOT + 'cards/defect/uncommon/',
                                            ROOT + 'cards/defect/rare/',
                                            ROOT + 'cards/colorless/',
                                            ROOT + 'cards/curses/'
                                            ], 
                                            'removedCardsContainerDefect', addStarters=True)
    removedModal += generateModalClose()

    skippedRaresModal = generateModalHeader('skippedRaresModalDefect', 'Skipped Rares')
    skippedRaresModal += generateCardModalItems([ROOT + 'cards/defect/rare/'], 'skippedRaresContainerDefect')
    skippedRaresModal += generateModalClose()

    # Add modals
    allModals += relicModal
    allModals += bossRelicModal
    allModals += potionModal
    allModals += deckModal
    allModals += rareDeckModal
    allModals += removedModal
    allModals += skippedRaresModal

    # Write
    with open('templates/defectModals_template.html', 'w') as fo:
        fo.write(allModals)

def createWatcherModals():
    allModals = ''

    # Define Modals
    relicModal = generateModalHeader('relicsModalWatcher', 'Relics')
    relicModal += generateRelicModalItems([ROOT + 'relics/'], 'relicsContainerWatcher')
    relicModal += generateModalClose()

    bossRelicModal = generateModalHeader('bossRelicsModalWatcher', 'Boss Relics')
    bossRelicModal += generateRelicModalItems([ROOT + 'boss_relics/'], 'bossRelicsContainerWatcher')
    bossRelicModal += generateModalClose()

    potionModal = generateModalHeader('potionsModalWatcher', 'Potions')
    potionModal += generateCardModalItems([ROOT + 'potions/'], 'potionsContainerWatcher', False)
    potionModal += generateModalClose()

    deckModal = generateModalHeader('deckModalWatcher', 'Deck')
    deckModal += generateCardModalItems([ROOT + 'cards/watcher/common/', 
                                        ROOT + 'cards/watcher/uncommon/',
                                        ROOT + 'cards/colorless/',
                                        ROOT + 'cards/curses/'
                                        ], 
                                        'deckContainerWatcher', addStarters=True)
    deckModal += generateModalClose()

    rareDeckModal = generateModalHeader('rareDeckModalWatcher', 'Rare Deck')
    rareDeckModal += generateCardModalItems([ROOT + 'cards/watcher/rare/'], 'rareDeckContainerWatcher')
    rareDeckModal += generateModalClose()

    removedModal = generateModalHeader('removedCardsModalWatcher', 'Removed Cards')
    removedModal += generateCardModalItems([ROOT + 'cards/watcher/common/', 
                                            ROOT + 'cards/watcher/uncommon/',
                                            ROOT + 'cards/watcher/rare/',
                                            ROOT + 'cards/colorless/',
                                            ROOT + 'cards/curses/'
                                            ], 
                                            'removedCardsContainerWatcher', addStarters=True)
    removedModal += generateModalClose()

    skippedRaresModal = generateModalHeader('skippedRaresModalWatcher', 'Skipped Rares')
    skippedRaresModal += generateCardModalItems([ROOT + 'cards/watcher/rare/'], 'skippedRaresContainerWatcher')
    skippedRaresModal += generateModalClose()

    # Add modals
    allModals += relicModal
    allModals += bossRelicModal
    allModals += potionModal
    allModals += deckModal
    allModals += rareDeckModal
    allModals += removedModal
    allModals += skippedRaresModal

    # Write
    with open('templates/watcherModals_template.html', 'w') as fo:
        fo.write(allModals)

if __name__ == '__main__':
    createGeneralModals()
    createIroncladModals()
    createSilentModals()
    createDefectModals()
    createWatcherModals()

