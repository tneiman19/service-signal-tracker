import dynamic from 'next/dynamic';

const EntityForm = dynamic(() => import('@/app/forms/entity/EntityForm'), {
    ssr: false,
    loading: () => <p>Loading...</p>
});

const NewEntity = () => {
    return (
        <EntityForm />
    );
}

export default NewEntity;