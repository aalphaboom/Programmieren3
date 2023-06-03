let person = 
{
    "name": "Gabriel",
    "alter": 14,
    "tumoStudent": true,
    "haustiere": ["Katze1", "Katze2"],

    sayHello()
    {
        console.log("Hallo, mein Name ist", this.name);
    },

    geburtstag()
    {
        this.alter += 1;
    },

    gehtNichtMehrZuTumo()
    {
        this.tumoStudent = false;
    },

    wieVieleHaustiere()
    {
        console.log(this.haustiere.length);
    }
}

person.sayHello();
console.log(person);
person.geburtstag();
console.log(person);
person.wieVieleHaustiere();