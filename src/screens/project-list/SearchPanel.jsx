
export default function SearchPanel({users,params,setParams}) {




  return (
    <>
      <form>
        <div>
          <input type="text" value={params.name} onChange={(event => {
            setParams({
              ...params,
              name: event.target.value
            });
          })} />
          <select value={params.personId} onChange={(event => {
            setParams({
              ...params,
              personId: event.target.value
            });
          })}>
            <option value="">负责人</option>
            {
              users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            }
          </select>
        </div>
      </form>
    </>
  );
}
