import moment from "moment";
import { NativeStorage } from "@ionic-native/native-storage";
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export function stateColor(state: string) {
    switch (state) {
        case 'FINISHED': {
            return 'success';
        }
        case 'CANCELLED': {
            return 'warning';
        }
        case 'DOING': {
            return 'secondary';
        }
        case 'PENDING': {
            return 'danger'
        }
        default: {
            return 'primary';
        }
    }
}

export function stateColorCode(state: string) {
    switch (state) {
        case 'FINISHED': {
            return 'rgba(103,194,58, 0.65)';
        }
        case 'CANCELLED': {
            return 'rgba(230,162,60, 0.65)';
        }
        case 'DOING': {
            return 'rgba(61,194,255, 0.65)';
        }
        case 'PENDING': {
            return 'rgba(202,41,38, 0.65)'
        }
        default: {
            return 'rgba(229,119,23, 0.65)';
        }
    }
}

export function stateName(state: string) {
    switch (state) {
        case 'FINISHED': {
            return 'Finalizado';
        }
        case 'CANCELLED': {
            return 'Cancelado';
        }
        case 'DOING': {
            return 'Proceso';
        }
        case 'PENDING': {
            return 'Pendiente'
        }
        default: {
            return 'Pendiente';
        }
    }
}

export function dayTimeName(state: string) {
    switch (state) {
        case 'MORNING': {
            return 'Entrada en la mañana';
        }
        case 'HALF_DAY': {
            return 'Salida a medio dia';
        }
        case 'AFTERNOON': {
            return 'Entrada en la tarde';
        }
        case 'NIGHT': {
            return 'Salida en la noche'
        }
        case 'COMPLETE_JOURNEY': {
            return 'Se completaron las 4 entradas del dia'
        }
        default: {
            return 'Entrada en la mañana';
        }
    }
}


export function formatDate(date: Date) {
   return moment(date).format('LL')
}

export function formatLongDate(date: Date) {
    return moment(date).format('lll')
}

export function saveItem(name: string, value: string) {
    NativeStorage.setItem(name, value)
        .then(() => console.log('Elemento almacenado'),
                error => console.log('Error al alamacenar elemento', error))
}

export async function setItem(key: string, value: string) {
    await Storage.set({
        key,
        value
    });
}

export async function getItem(key: string) {
    const { value } = await Storage.get({ key });
    return value
}

export async function removeItem(key: string) {
    await Storage.remove({ key });
}
