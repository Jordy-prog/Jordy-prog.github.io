import os

FOLDER = 'static/images/cards/colorless/'
CONTAINER_ID = 'skippedColorlessContainer'

images = os.listdir(FOLDER)
cardInfo = list(map(lambda x: (x.replace('.png', '').replace('_', ' ').title(), '/' + FOLDER + x), images))

with open('template.html', 'w') as fo:
    for cardName, imagePath in cardInfo:
        amount = 2 if ('/common/' in imagePath or '/curses/' in imagePath) and not 'decay' in imagePath else 1

        for i in range(amount):
            elementId = imagePath.split('/')[-1].replace('.png', '') + str(i)

            element =   f'''<li id="{elementId}" class="card-list-item" data-copy-target="{CONTAINER_ID}">
    <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
    <span class="card-label">{cardName}</span>
    <img class="card-upgrade" src="/static/images/upgrade.png">
    <div class="flex-spacer"></div>
    <img class="card-image" src="{imagePath}">
</li>\n'''

            fo.write(element)