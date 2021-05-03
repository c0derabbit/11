new_post_en = src/blog/en/$(slug).md
new_post_hu = src/blog/hu/$(slug).md

define POST_TEMPLATE
---
draft: true
tite: $(title)
location: $(loc)
date: $(date)
supportedOrg: $(org)
supportedOrgLink: $(orglink)
supportedOrgDescription: $(orgdescription)
donation: $(donation)
---
endef
export POST_TEMPLATE

.PHONY: post
post:
	touch "$(new_post_hu)"
	touch "$(new_post_en)"
	echo "$$POST_TEMPLATE" >> "$(new_post_hu)"
	echo "$$POST_TEMPLATE" >> "$(new_post_en)"
