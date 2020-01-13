from django.urls import path

from article.views import ArticleIndexView, ArticleView, DateArticleListView

app_name = "users"

urlpatterns = [
    path('', ArticleIndexView.as_view(), name="index"),
    path('date/<t_date>', DateArticleListView.as_view(), name="DateArticle"),
    path('fulltext/<int:total_id>', ArticleView.as_view(), name="fulltext"),
]