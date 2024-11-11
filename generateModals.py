import os


def generateRelicModalItems(folders, container_id):
    image_paths = []

    for folder in folders:
        image_paths.extend(map(lambda image: '/' + folder + image, os.listdir(folder)))

    image_paths.sort(key=lambda x: x.split('/')[-1])

    info = list(map(lambda x: (x.split('/')[-1].replace('.png', '').replace('_', ' ').title(), x), image_paths))

    with open('template.html', 'w') as fo:
        for name, imagePath in info:
            elementId = imagePath.split('/')[-1].replace('.png', '')

            element = f'''<div class="item" data-copy-target="{container_id}">
    <img class="item-image" src="{imagePath}">
    <div class="item-footer">
        <img class="item-checkbox" src="/static/images/tickbox_unticked.png">
        <span class="item-label">{name}</span>
    </div>
</div>\n'''

            fo.write(element)

def generateCardModalItems(folders, container_id, upgrade=True):
    image_paths = []

    for folder in folders:
        image_paths.extend(map(lambda image: '/' + folder + image, os.listdir(folder)))

    image_paths.sort(key=lambda x: x.split('/')[-1])

    info = list(map(lambda x: (x.split('/')[-1].replace('.png', '').replace('_', ' ').title(), x), image_paths))

    with open('template.html', 'w') as fo:
        for name, imagePath in info:
            amount = 2 if ('/common/' in imagePath or '/curses/' in imagePath) and not 'decay' in imagePath else 1

            for i in range(amount):
                elementId = imagePath.split('/')[-1].replace('.png', '') + str(i)

                element = f'''<li id="{elementId}" class="card-list-item" data-copy-target="{container_id}">
    <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
    <span class="card-label">{name}</span>\n'''

                if upgrade:
                    element += '''\t<img class="card-upgrade" src="/static/images/upgrade.png">'''

                element += f'''
    <div class="flex-spacer"></div>
    <img class="card-image" src="{imagePath}">
</li>\n'''

                fo.write(element)                          


if __name__ == '__main__':
    ROOT = 'static/images/'

    # generateRelicModalItems([ROOT + 'relics/'], 'skippedRelicsContainer')
    # generateRelicModalItems([ROOT + 'boss_relics/'], 'skippedBossRelicsContainer')
    # generateCardModalItems([ROOT + 'potions/'], 'skippedPotionsContainer')
    # generateCardModalItems([ROOT + 'cards/curses/'], 'skippedCursesContainer', False)
    # generateCardModalItems([ROOT + 'cards/colorless/'], 'skippedColorlessContainer')