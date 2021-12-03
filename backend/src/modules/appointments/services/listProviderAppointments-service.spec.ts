import listProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailability';
import fakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fake-appointmentsRespository';
import listProviderAppointmentsService from '@modules/appointments/services/listProviderAppointments-service';
import appointment from '../infra/typeorm/entities/appointments-model';

let ListProviderDayAvailability: listProviderDayAvailability;
let FakeAppointmentsRepository = new fakeAppointmentsRepository();
let listProviderAppointments = new listProviderAppointmentsService(
    FakeAppointmentsRepository,
);

describe('listProviderAppointments', () => {
    it('should be able to list the day availability from provider', async () => {
        ListProviderDayAvailability = new listProviderDayAvailability(
            FakeAppointmentsRepository,
        );

        const appointment1 = await FakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 16, 14, 0, 0),
        });

        const appointment2 = await FakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 16, 15, 0, 0),
        });

        const availability = await listProviderAppointments.execute({
            provider_id: 'provider',
            day: 16,
            month: 5,
            year: 2020,
        });

        expect(availability).toEqual([appointment1, appointment2])
    });
});
