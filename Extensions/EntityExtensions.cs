namespace AnvilAndQuill.Extensions
{
    public static class EntityExtensions
    {
        public static void UpdateFromDTO<TEntity, TDto>(this TEntity entity, TDto dto)
            where TEntity : class
            where TDto : class
        {
            var dtoType = typeof(TDto);
            var entityType = typeof(TEntity);
            //loop through dto properties and update entity properties if they are not null
            foreach (var dtoProp in dtoType.GetProperties())
            {
                var dtoValue = dtoProp.GetValue(dto);
                if (dtoValue == null)
                {
                    continue;
                }
                var entityProp = entityType.GetProperty(dtoProp.Name);

                if (entityProp != null && entityProp.CanWrite)
                {
                    entityProp.SetValue(entity, dtoValue);
                }
            }
        }
    }
}
