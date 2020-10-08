# 如果没有消息后缀，默认提交信息为 `:pencil: update source code of this blog.`
info=$1
if ["$info" = ""]
then info=":pencil: update source code of this blog."
fi
git add -A
git commit -m "$info"
git push origin master
