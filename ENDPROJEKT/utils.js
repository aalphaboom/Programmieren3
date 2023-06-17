module.exports = function random(list)
{
    if(list.length <= 0) return;
    let randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}