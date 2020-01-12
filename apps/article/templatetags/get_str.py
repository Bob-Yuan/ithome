from django import template

register = template.Library()


@register.filter
def get_str(url):
    if url.find("date") == -1:
        return '/'
    else:
        return 'date'
