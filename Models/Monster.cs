namespace AnvilAndQuill.Models
{
    //TODO: implement rest of properties for a monster
    public class Monster
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int MonsterTypeId { get; set; }
        public MonsterType? MonsterType { get; set; }
    }
}
